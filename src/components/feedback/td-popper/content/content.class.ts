import {
  Computed,
  Signal,
  signal,
  unref,
  watch,
  WatchStopHandle,
} from '@type-dom/signals';
import { isElement, isNil, NOOP, setStyle } from '@type-dom/utils';
import {
  defineExpose,
  onBeforeUnmount,
  TypeDivProps,
  onMounted,
  TypeDiv,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { Instance } from '@type-dom/popper';
import { FormItemProps } from '../../../form/td-form-item/td-form-item.interface';
import { formItemContextKey } from '../../../form/td-form/td-form.const';
import { TdFocusTrap } from '../../td-focus-trap/td-focus-trap.class';
import { POPPER_CONTENT_INJECTION_KEY } from '../constants';
import { usePopperContent } from '../composable/use-content';
import { usePopperContentDOM } from '../composable/use-content-dom';
import { usePopperContentFocusTrap } from '../composable/use-focus-trap';
import { ITdPopperContent, PopperContentProps } from './content.interface';
import { popperContentEmits } from './content.const';

export class TdPopperContent extends TypeDiv implements ITdPopperContent {
  className: 'TdPopperContent';
  override props: PopperContentProps & TypeDivProps;

  // 只需要定义就好，exposed方法会赋值；
  popperContentRef!: Signal<HTMLElement | undefined>;
  popperInstanceRef?: Computed<Instance | undefined>;
  updatePopper!: (shouldUpdateZIndex?: boolean) => void;
  contentStyle!: IStyle;

  constructor(params: PopperContentProps = {}) {
    super();
    console.log('TdPopperContent . ');
    this.className = 'TdPopperContent';
    this.attr.addName('td-popper-content');
    this.addEmits(popperContentEmits);
    this.props = this.useParams(params) as PopperContentProps & TypeDivProps;
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const {
      focusStartRef,
      trapped,
      onFocusAfterReleased,
      onFocusAfterTrapped,
      onFocusInTrap,
      onFocusoutPrevented,
      onReleaseRequested,
    } = usePopperContentFocusTrap(props, emit);

    const {
      attributes,
      arrowRef,
      contentRef,
      state,
      styles,
      instanceRef,
      role,
      update,
    } = usePopperContent(props);

    const {
      ariaModal,
      arrowStyle,
      // contentAttrs,
      contentClass,
      contentStyle,
      updateZIndex,
    } = usePopperContentDOM(props, {
      styles,
      attributes,
      role,
    });

    const formItemContext = this.inject<FormItemProps>(
      formItemContextKey,
      undefined
    );
    const arrowOffset = signal<number>();

    this.provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowStyle,
      arrowRef,
      arrowOffset,
    });

    if (formItemContext) {
      // disallow auto-id from inside popper content
      this.provide(formItemContextKey, {
        ...(formItemContext as any),
        addInputId: NOOP,
        removeInputId: NOOP,
      });
    }

    let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined;

    const updatePopper = async (shouldUpdateZIndex = true) => {
      console.warn('updatePopper . ');
      if (!instanceRef.get()) {
        return;
      }
      const state = await update();
      console.warn('state is ', state);
      if (!state) return;
      if (contentRef.get()) {
        this.attr.setObj({
          // maybe flip
          dataPopperPlacement: state.placement,
        });
        const popperStyle = state?.styles.popper;
        if (popperStyle) {
          setStyle(contentRef.get()!, {
            position: state.strategy,
            left: popperStyle.left + 'px',
            top: popperStyle.top + 'px',
          });
        }
        const arrowDom = arrowRef.get();
        if (arrowDom && state?.middlewareData.arrow) {
          // const arrowStyle = matchPlacement(state.placement?.split('-')?.shift() as keyof typeof $placements || 'top');
          // setStyle(arrowDom, {
          //   position: state.strategy,
          //   ...arrowStyle
          // });

          const arrowParams = state.middlewareData.arrow;
          if (arrowParams?.x) {
            setStyle(arrowDom, {
              left: arrowParams.x + 'px',
            });
          }
          if (arrowParams?.y) {
            setStyle(arrowDom, {
              top: arrowParams.y + 'px',
            });
          }
        }
      }
      shouldUpdateZIndex && updateZIndex();
    };

    const togglePopperAlive = () => {
      console.warn('togglePopperAlive . ');
      updatePopper(false);
      if (unref(props.visible) && props.focusOnShow) {
        trapped.set(true);
      } else if (unref(props.visible) === false) {
        trapped.set(false);
      }
    };

    onMounted(() => {
      watch(
        () => props.triggerTargetEl,
        (triggerTargetEl, prevTriggerTargetEl) => {
          triggerTargetAriaStopWatch?.();
          triggerTargetAriaStopWatch = undefined;

          const el = unref(triggerTargetEl || contentRef?.get());
          const prevEl = unref(prevTriggerTargetEl || contentRef?.get());

          if (isElement(el)) {
            triggerTargetAriaStopWatch = watch(
              () => [
                role.get(),
                unref(props.ariaLabel),
                ariaModal.get(),
                unref(props.id),
              ],
              (watches) => {
                ['role', 'aria-label', 'aria-modal', 'id'].forEach(
                  (key, idx) => {
                    isNil(watches[idx])
                      ? el.removeAttribute(key)
                      : el.setAttribute(key, watches[idx]! as string);
                  }
                );
              },
              { immediate: true }
            );
          }
          if (prevEl !== el && isElement(prevEl)) {
            ['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
              prevEl.removeAttribute(key);
            });
          }
        },
        { immediate: true }
      );

      watch(() => unref(props.visible), togglePopperAlive, { immediate: true });
    });

    onBeforeUnmount(() => {
      triggerTargetAriaStopWatch?.();
      triggerTargetAriaStopWatch = undefined;
    });

    defineExpose({
      /**
       * @description popper content element
       */
      popperContentRef: contentRef,
      /**
       * @description popperjs instance
       */
      popperInstanceRef: instanceRef,
      /**
       * @description method for updating popper
       */
      updatePopper,

      /**
       * @description content style
       */
      contentStyle,
    });

    this.assignProps({
      refDom: contentRef,
    });
    this.attr.addObj({
      tabindex: -1,
      class: contentClass,
    });
    this.style.addObj(contentStyle);
    this.addChild(
      new TdFocusTrap({
        trapped: trapped,
        trapOnFocusIn: true,
        focusTrapEl: contentRef,
        focusStartEl: focusStartRef,
        emits: {
          focusAfterTrapped: onFocusAfterTrapped,
          focusAfterReleased: onFocusAfterReleased,
          focusin: onFocusInTrap,
          focusoutPrevented: onFocusoutPrevented,
          releaseRequested: onReleaseRequested,
        },
        slot: props.slot,
      })
    );
  }
}
