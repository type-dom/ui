import {
  Div,
  Img,
  // useAttrs as useRawAttrs,
  nextTick,
  onMounted,
  TypeDiv,
  useEventListener,
  useThrottleFn,
  Fragment,
  ISlotRaw,
} from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import {
  getScrollContainer,
  isArray,
  isClient,
  isElement,
  isFunction,
  isInContainer,
  isString,
} from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
// import { useAttrs } from '../../../hooks/use-attrs';
import { useLocale } from '../../../hooks/use-locale';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdImage, ImageProps } from './td-image.interface';
import { imageEmits, imageProps } from './td-image.const';
import { TdImageViewer } from '../td-image-viewer/td-image-viewer.class';
import './style/index';

export class TdImage extends TypeDiv implements ITdImage {
  className: 'TdImage';
  override props: ImageProps;
  showPreview?: () => void;

  constructor(params: ImageProps = {}) {
    super();
    this.className = 'TdImage';
    this.attr.addObj({
      name: 'td-image',
      ref: 'container',
    });

    this.addEmits(imageEmits);
    this.assignProps(imageProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale();
    const ns = useNamespace('image');
    // const rawAttrs = useRawAttrs();

    // todo
    // const containerAttrs = computed(() => {
    //   return fromPairs(
    //     Object.entries(rawAttrs!).filter(
    //       ([key]) => /^(data-|on[A-Z])/i.test(key) || ['id', 'style'].includes(key)
    //     )
    //   );
    // });

    // const imgAttrs = useAttrs({
    //   excludeListeners: true,
    //   // excludeKeys: computed<string[]>(() => {
    //   //   return Object.keys(containerAttrs.get());
    //   // })
    // });

    const imageSrc = signal<string | undefined>();
    const hasLoadError = signal(false);
    const isLoading = signal(true);
    const showViewer = signal(false);
    const container = signal<HTMLElement>();
    const _scrollContainer = signal<HTMLElement | Window | undefined>();

    const supportLoading = isClient && 'loading' in HTMLImageElement.prototype;
    let stopScrollListener: (() => void) | undefined;

    const imageKls = computed(() => [
      ns.e('inner'),
      preview.get() && ns.e('preview'),
      isLoading.get() && ns.is('loading'), // todo 不会消除
    ]);

    const imageStyle = computed<IStyle>(() => {
      const { fit } = props;
      if (isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });

    const preview = computed(() => {
      const { previewSrcList } = props;
      return isArray(previewSrcList) && previewSrcList.length > 0;
    });

    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (previewSrcList && initialIndex) {
        if (initialIndex > previewSrcList.length - 1) {
          previewIndex = 0;
        }
      }
      return previewIndex;
    });

    const isManual = computed(() => {
      if (props.loading === 'eager') {
        return false;
      }
      return (!supportLoading && props.loading === 'lazy') || props.lazy;
    });

    const loadImage = () => {
      // console.warn('loadImage . ');
      if (!isClient) {
        return;
      }
      // reset status
      isLoading.set(true);
      hasLoadError.set(false);
      // console.warn('props.src is ', props.src);
      imageSrc.set(props.src);
    };

    function handleLoad(event?: Event) {
      // console.warn('td-image handleLoad. ');
      isLoading.set(false);
      imageKls.get();
      hasLoadError.set(false);
      emit('load', event);
    }

    function handleError(event?: Event) {
      // console.error('td-image handleError . ')
      isLoading.set(false);
      hasLoadError.set(true);
      emit('error', event);
    }

    function handleLazyLoad() {
      if (isInContainer(container.get(), _scrollContainer.get())) {
        loadImage();
        removeLazyLoadListener();
      }
    }

    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true);

    async function addLazyLoadListener() {
      if (!isClient) return;

      await nextTick();

      const { scrollContainer } = props;
      if (isElement(scrollContainer)) {
        _scrollContainer.set(scrollContainer);
      } else if (isString(scrollContainer) && scrollContainer !== '') {
        _scrollContainer.set(
          document.querySelector<HTMLElement>(scrollContainer) ?? undefined
        );
      } else if (container.get()) {
        _scrollContainer.set(getScrollContainer(container.get()!));
      }

      if (_scrollContainer.get()) {
        stopScrollListener = useEventListener(
          _scrollContainer,
          'scroll',
          lazyLoadHandler
        );
        setTimeout(() => handleLazyLoad(), 100);
      }
    }

    function removeLazyLoadListener() {
      if (!isClient || !_scrollContainer.get() || !lazyLoadHandler) return;

      stopScrollListener?.();
      _scrollContainer.set(undefined);
    }

    function clickHandler() {
      // don't show viewer when preview is false
      // console.error('clickHandler . ');
      if (!preview.get()) return;

      showViewer.set(true);
      emit('show');
    }

    function closeViewer() {
      showViewer.set(false);
      emit('close');
    }

    function switchViewer(val: number) {
      emit('switch', val);
    }

    // () => props.src  这样也能监听到 props.src 赋值的。
    watch(
      () => props.src,
      () => {
        // console.warn('watch props.src is ', newSrc, oldSrc);
        if (isManual.get()) {
          // console.warn('watch isManual props.src is ', newSrc);
          // reset status
          isLoading.set(true);
          hasLoadError.set(false);
          removeLazyLoadListener();
          addLazyLoadListener();
        } else {
          loadImage();
        }
      },
      // { immediate: true }
    );

    onMounted(() => {
      // console.warn('onMounted . ');
      if (isManual.get()) {
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    this.showPreview = clickHandler;
    // defineExpose({
    //   /** @description manually open preview */
    //   showPreview: clickHandler,
    // });
    this.assignProps({
      refDom: container,
      // v-bind="containerAttrs" todo
      attrObj: {
        class: ns.b(), // todo [ns.b(), $attrs.class]
      },
    });

    this.addChild(
      new Fragment({
        slot: computed(() => {
          if (hasLoadError.get()) {
            // console.warn('hasLoadError.get() is ', hasLoadError.get());
            return props.slots?.error as ISlotRaw ?? new Div({
              class: ns.e('error'),
              slot: t('el.image.error'),
            })
          } else {
            return [
              new Img({
                vIf: imageSrc.get(),
                class: imageKls,
                attrObj: {
                  loading: props.loading, // todo
                  // ...imgAttrs.get(), // v-bind imgAttrs
                  src: imageSrc.get() ?? '', // must has src. other then trigger events ,eg. load error
                  crossorigin: props.crossorigin,
                  alt: props.name ?? 'image'
                },
                styleObj: imageStyle,
                events: {
                  click: clickHandler,
                  load: handleLoad,
                  error: handleError,
                }
              }),
              new Div({
                vIf: isLoading.get(),
                class: ns.e('wrapper'),
                slot: props.slots?.placeholder ?? new Div({
                  class: ns.e('placeholder'),
                })
              }),
            ]
          }
        })
      })
    );

    this.addChild(
      new Fragment({
        vIf: preview,
        slot: new TdImageViewer({
          vIf: showViewer,
          initialIndex: imageIndex.get(),
          zoomRate: props.zoomRate,
          infinite: props.infinite,
          minScale: props.minScale,
          maxScale: props.maxScale,
          showProgress: props.showProgress,
          urlList: props.previewSrcList,
          hideOnClickModal: props.hideOnClickModal,
          teleported: props.previewTeleported,
          closeOnPressEscape: props.closeOnPressEscape,
          attrObj: {
            zIndex: props.zIndex,
            crossorigin: props.crossorigin,
          },
          emits: {
            close: closeViewer,
            switch: switchViewer,
          },
          slot: props.slots?.viewer
            ? new Div({
              slot: props.slots.viewer,
            })
            : undefined,
          slots: {
            progress: (progress) => isFunction(props.slots?.progress)
            ? props.slots?.progress(progress)
              : undefined,
            toolbar: ({ actions, prev, next, reset, activeIndex }) => isFunction(props.slots?.toolbar)
              ? props.slots?.toolbar({ actions, prev, next, reset, activeIndex })
              : undefined,
          }
        })
      }
    ))
  }
}
