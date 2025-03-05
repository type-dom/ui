import { throttle } from 'lodash';
import { IStyle } from '@type-dom/css-type';
import { computed, effectScope, signal, unref, watch } from '@type-dom/signals';
import { keysOf } from '@type-dom/utils';
import {
  nextTick,
  onMounted,
  useEventListener,
  Div,
  I,
  Img,
  Span,
  Fragment,
  Transition,
  TypeFragment,
} from '@type-dom/framework';
import {
  ElArrowLeftSvg,
  ElArrowRightSvg,
  ElCloseSvg,
  ElFullScreenSvg,
  ElRefreshLeftSvg,
  ElRefreshRightSvg,
  ElScaleToOriginalSvg,
  ElZoomInSvg,
  ElZoomOutSvg,
} from '@type-dom/svgs';
import { useNamespace } from '../../../hooks/use-namespace';
import { useZIndex } from '../../../hooks/use-z-index';
import { useLocale } from '../../../hooks/use-locale';
import { EVENT_CODE } from '../../../constants/aria';
import { TdTeleport } from '../../base/td-teleport/td-teleport.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdFocusTrap } from '../../feedback/td-focus-trap/td-focus-trap.class';
import {
  ITdImageViewer,
  ImageViewerMode,
  ImageViewerProps,
  ImageViewerAction,
} from './td-image-viewer.interface';
import { imageViewerEmits, imageViewerProps } from './td-image-viewer.const';
import './style/index';

export class TdImageViewer extends TypeFragment implements ITdImageViewer {
  className: 'TdImageViewer';
  override props: ImageViewerProps;
  setActiveItem?: (index: number) => void;

  constructor(params: ImageViewerProps = {}) {
    super();
    this.className = 'TdImageViewer';

    this.addEmits(imageViewerEmits);
    this.assignProps(imageViewerProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.warn('TdImageViewer setup . ');
    const modes: Record<'CONTAIN' | 'ORIGINAL', ImageViewerMode> = {
      CONTAIN: {
        name: 'contain',
        icon: new ElFullScreenSvg(),
      },
      ORIGINAL: {
        name: 'original',
        icon: new ElScaleToOriginalSvg(),
      },
    };

    const props = this.props;
    const emit = this.emit;

    let stopWheelListener: (() => void) | undefined
    let prevOverflow = ''

    const { t } = useLocale();
    const ns = useNamespace('image-viewer');
    const { nextZIndex } = useZIndex();
    const wrapper = signal<HTMLDivElement>();
    const imgRefs = signal<HTMLImageElement[]>([]);

    const scopeEventListener = effectScope();

    const loading = signal(true);
    const activeIndex = signal(props.initialIndex!);
    const mode = signal<ImageViewerMode>(modes.CONTAIN);
    const transform = signal({
      // signal is object, then effect reset object .
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    });
    const zIndex = signal(props.zIndex ?? nextZIndex());

    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList && urlList.length <= 1;
    });

    const isFirst = computed(() => {
      return activeIndex.get() === 0;
    });

    const isLast = computed(() => {
      return activeIndex.get() === props.urlList!.length - 1;
    });

    const currentImg = computed(() => {
      // console.warn('currentImg . ');
      return props.urlList && props.urlList[activeIndex.get() || 0];
    });

    const arrowPrevKls = computed(() => [
      ns.e('btn'),
      ns.e('prev'),
      ns.is('disabled', !props.infinite && isFirst.get()),
    ]);

    const arrowNextKls = computed(() => [
      ns.e('btn'),
      ns.e('next'),
      ns.is('disabled', !props.infinite && isLast.get()),
    ]);

    // only when set transform, imgStyle will change; it is different from vue's reactivity.
    const imgStyle = computed(() => {
      // console.warn('imgStyle . ');
      // console.warn('imgStyle transform.get() is ', transform.get());
      const { scale, deg, offsetX, offsetY, enableTransition } =
        transform.get();
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;

      const radian = (deg * Math.PI) / 180;
      const cosRadian = Math.cos(radian);
      const sinRadian = Math.sin(radian);
      translateX = translateX * cosRadian + translateY * sinRadian;
      translateY = translateY * cosRadian - (offsetX / scale) * sinRadian;

      const style: IStyle = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? 'transform .3s' : '',
      };
      if (mode.get().name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    });

    const progress = computed(
      () => `${activeIndex.get() + 1} / ${props.urlList!.length}`
    )

    function hide() {
      // console.warn('hide . ');
      unregisterEventListener();
      stopWheelListener?.()
      document.body.style.overflow = prevOverflow
      emit('close');
    }

    function registerEventListener() {
      const keydownHandler = throttle((e: KeyboardEvent) => {
        switch (e.code) {
          // ESC
          case EVENT_CODE.esc:
            props.closeOnPressEscape && hide();
            break;
          // SPACE
          case EVENT_CODE.space:
            toggleMode();
            break;
          // LEFT_ARROW
          case EVENT_CODE.left:
            prev();
            break;
          // UP_ARROW
          case EVENT_CODE.up:
            handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case EVENT_CODE.right:
            next();
            break;
          // DOWN_ARROW
          case EVENT_CODE.down:
            handleActions('zoomOut');
            break;
        }
      });
      const mousewheelHandler = throttle((e: WheelEvent) => {
        const delta = e.deltaY || e.deltaX;
        handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
          zoomRate: props.zoomRate,
          enableTransition: false,
        });
      });

      scopeEventListener.run(() => {
        useEventListener(document, 'keydown', keydownHandler);
        useEventListener(document, 'wheel', mousewheelHandler);
      });
    }

    function unregisterEventListener() {
      scopeEventListener.stop();
    }

    function handleImgLoad() {
      // console.warn('handleImgLoad . ');
      loading.set(false);
    }

    function handleImgError(e: Event) {
      // console.warn('handleImgError . ');
      loading.set(false);
      (e.target as HTMLImageElement).alt = t('el.image.error');
    }

    function handleMouseDown(e: MouseEvent) {
      if (loading.get() || e.button !== 0 || !wrapper.get()) return;
      transform.get().enableTransition = false;

      const { offsetX, offsetY } = transform.get();
      const startX = e.pageX;
      const startY = e.pageY;

      const dragHandler = throttle((ev: MouseEvent) => {
        transform.set({
          ...transform.get(),
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY,
        });
      });
      const removeMousemove = useEventListener(
        document,
        'mousemove',
        dragHandler
      );
      useEventListener(document, 'mouseup', () => {
        removeMousemove();
      });

      e.preventDefault();
    }

    function reset() {
      transform.set({
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      });
    }

    function toggleMode() {
      // console.error('toggleMode . ');
      // if (loading.get()) return; // todo edit by me

      const modeNames = keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.get().name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.set(modes[modeNames[nextIndex]]);
      reset();
    }

    function setActiveItem(index: number) {
      // console.error('setActiveItem . index is ', index);
      const len = props.urlList!.length;
      activeIndex.set((index + len) % len);
    }

    function prev() {
      if (isFirst.get() && !props.infinite) return;
      setActiveItem(activeIndex.get()! - 1);
    }

    function next() {
      // console.error('next . ');
      if (isLast.get() && !props.infinite) return;
      setActiveItem(activeIndex.get() + 1);
    }

    function handleActions(action: ImageViewerAction, options = {}) {
      // console.error('handleActions . action is ', action);
      // if (loading.get()) return; // todo
      const { minScale, maxScale } = props;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      };
      switch (action) {
        case 'zoomOut':
          if (transform.get().scale > minScale!) {
            transform.get().scale = Number.parseFloat(
              (transform.get().scale / zoomRate!).toFixed(3)
            );
          }
          break;
        case 'zoomIn':
          if (transform.get().scale < maxScale!) {
            transform.get().scale = Number.parseFloat(
              (transform.get().scale * zoomRate!).toFixed(3)
            );
          }
          break;
        case 'clockwise':
          transform.get().deg += rotateDeg;
          // transform.set({ ...transform.get(), deg: transform.get().deg })
          emit('rotate', transform.get().deg);
          break;
        case 'anticlockwise':
          transform.get().deg -= rotateDeg;
          // transform.set({ ...transform.get(), deg: transform.get().deg })
          emit('rotate', transform.get().deg);
          break;
      }
      transform.get().enableTransition = enableTransition;
      // must distracture, otherwise will not trigger effect
      transform.set({ ...transform.get() }); // add by me to trigger effect
    }

    function onFocusoutPrevented(event?: CustomEvent) {
      if (event?.detail?.focusReason === 'pointer') {
        event?.preventDefault();
      }
    }

    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        hide();
      }
    }

    function wheelHandler(e: WheelEvent) {
      if (!e.ctrlKey) return undefined;

      if (e.deltaY < 0) {
        e.preventDefault()
        return false
      } else if (e.deltaY > 0) {
        e.preventDefault()
        return false
      }
      return undefined;
    }

    watch(currentImg, () => {
      nextTick(() => {
        // todo imgRefs.get()[0] has error , can not get nothing ;
        //      then loading always is true;
        const $img = imgRefs.get()[0];
        if (!$img?.complete) {
          // loading.set(true) // todo reopen
        }
      });
    });

    watch(activeIndex, (val) => {
      reset();
      emit('switch', val);
    });

    onMounted(() => {
      watch(() => unref(props.vIf), (val) => {
        if (val !== false ) { // add by me
          registerEventListener();

          stopWheelListener = useEventListener('wheel', wheelHandler, {
            passive: false,
          })

          // prevent body scroll
          prevOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
        }
      })

    });
    /**
     * @description manually switch image
     */
    this.setActiveItem = setActiveItem;

    // console.error('then image-viewer add TdTeleport');
    this.addChild(
      new TdTeleport({
        to: 'body',
        disabled: !props.teleported,
        slot: new Transition({
          name: 'viewer-fade',
          appear: true,
          slot: new Div({
            // vIf: props.vIf,  // parent element convert to down real element;
            refDom: wrapper,
            attrObj: {
              tabindex: '-1',
              class: ns.e('wrapper'),
            },
            styleObj: {
              zIndex: zIndex,
            },
            slot: new TdFocusTrap({
              loop: true,
              trapped: true,
              focusTrapEl: wrapper,
              focusStartEl: 'container',
              emits: {
                focusoutPrevented: onFocusoutPrevented,
                releaseRequested: onCloseRequested,
              },
              slot: () => [
                new Div({
                  class: ns.e('mask'),
                  events: {
                    click: (evt, ele) => {
                      if (evt?.target === ele?.dom) {
                        props.hideOnClickModal && hide();
                      }
                    },
                  },
                }),
                // <!-- CLOSE -->
                new Span({
                  class: [ns.e('btn'), ns.e('close')],
                  events: {
                    click: hide,
                  },
                  slot: new TdIcon({
                    slot: new ElCloseSvg(),
                  }),
                }),

                // <!-- ARROW -->
                new Fragment({
                  vIf: computed(() => !isSingle.get()),
                  slot: [
                    new Span({
                      class: arrowPrevKls,
                      events: {
                        click: prev,
                      },
                      slot: new TdIcon({
                        slot: new ElArrowLeftSvg(),
                      }),
                    }),
                    new Span({
                      class: arrowNextKls,
                      events: {
                        click: next,
                      },
                      slot: new TdIcon({
                        slot: new ElArrowRightSvg(),
                      }),
                    }),
                  ],
                }),
                new Div({
                  vIf: props.showProgress,
                  class: [ns.e('btn'), ns.e('progress')],
                  slot: props.slots?.progress?.(activeIndex, props.urlList?.length) ?? progress,
                }),

                // <!-- ACTIONS -->
                new Div({
                  class: [ns.e('btn'), ns.e('actions')],
                  slot: new Div({
                    class: ns.e('actions__inner'),
                    slot: props.slots?.toolbar?.({
                      actions: handleActions,
                      prev: prev,
                      next: next,
                      reset: toggleMode,
                      activeIndex: activeIndex,
                    }) ?? [
                      new TdIcon({
                        events: {
                          click: () => handleActions('zoomOut'),
                        },
                        slot: new ElZoomOutSvg(),
                      }),
                      new TdIcon({
                        events: {
                          click: () => handleActions('zoomIn'),
                        },
                        slot: new ElZoomInSvg(),
                      }),
                      new I({
                        class: ns.e('actions__divider'),
                      }),
                      new TdIcon({
                        events: {
                          click: toggleMode,
                        },
                        slot: computed(() => mode.get().icon),
                      }),
                      new I({
                        class: ns.e('actions__divider'),
                      }),
                      new TdIcon({
                        events: {
                          click: () => handleActions('anticlockwise'),
                        },
                        slot: new ElRefreshLeftSvg(),
                      }),
                      new TdIcon({
                        events: {
                          click: () => handleActions('clockwise'),
                        },
                        slot: new ElRefreshRightSvg(),
                      }),
                    ],
                  }),
                }),

                // <!-- CANVAS -->
                new Div({
                  class: ns.e('canvas'),
                  slot: props.urlList?.map(
                    (url, i) =>
                      new Img({
                        vShow: computed(() => i === activeIndex.get()),
                        // refDom: ((el) => (imgRefs.get()[i] = el as HTMLImageElement)), // todo ??? how todo
                        attrObj: {
                          src: url || '',
                          class: ns.e('img'),
                          crossorigin: props.crossorigin,
                        },
                        styleObj: imgStyle,
                        emits: {
                          load: handleImgLoad,
                          error: handleImgError,
                          mousedown: handleMouseDown,
                        },
                      })
                  ),
                }),
                new Fragment({
                  slot: props.slot,
                })
              ],
            }),
          }),
        }),
      })
    );
  }
}
