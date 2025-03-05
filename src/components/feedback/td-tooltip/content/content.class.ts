import {
  defineExpose,
  inject,
  onBeforeUnmount,
  onClickOutside,
  TypeFragmentProps,
  Transition,
  TypeFragment,
} from '@type-dom/framework';
import { Signal, computed, signal, unref, watch } from '@type-dom/signals';
import { composeEventHandlers } from '@type-dom/utils';
import { usePopperContainerId } from '../../../../hooks/use-popper-container';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdTeleport } from '../../../base/td-teleport/td-teleport.class';
import { tryFocus } from '../../td-focus-trap/utils';
import { TdPopperContent } from '../../td-popper/content/content.class';
import { TOOLTIP_INJECTION_KEY } from '../td-tooltip.const';
import { ITdTooltipContent, TooltipContentProps } from './content.interface';
import { tooltipContentProps } from './content.const';

export class TdTooltipContent
  extends TypeFragment
  implements ITdTooltipContent
{
  className: 'TdTooltipContent';
  override props: TooltipContentProps & TypeFragmentProps;
  contentRef?: Signal<TdPopperContent>;
  isFocusInsideContent?: (event?: FocusEvent) => boolean;

  constructor(params: TooltipContentProps & TypeFragmentProps = {}) {
    super();
    // console.log('TdTooltipContent params: ', params);
    this.className = 'TdTooltipContent';
    this.assignProps(tooltipContentProps); // TdTooltip中已经预加载了；
    this.props = this.useParams(params) as TooltipContentProps &
      TypeFragmentProps;
  }

  override setup() {
    const props = this.props;

    const { selector } = usePopperContainerId();
    const ns = useNamespace('tooltip');

    const contentRef = signal<TdPopperContent>();
    let stopHandle: ReturnType<typeof onClickOutside>;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide,
    } = inject(TOOLTIP_INJECTION_KEY, undefined)!;
    const transitionClass = computed(() => {
      return props.transition || `${ns.namespace.get()}-fade-in-linear`;
    });
    const persistentRef = computed(() => {
      // For testing, we would always want the content to be rendered
      // to the DOM, so we need to return true here.
      if (process.env.NODE_ENV === 'test') {
        return true;
      }
      return props.persistent;
    });

    onBeforeUnmount(() => {
      stopHandle?.();
    });

    const shouldRender = computed(() => {
      // console.log(
      //   'shouldRender persistentRef is ',
      //   persistentRef,
      //   ' open is ',
      //   open
      // );
      return unref(persistentRef) ? true : unref(open);
    });

    const shouldShow = computed(() => {
      return unref(props.disabled) ? false : unref(open);
    });

    const appendTo = computed(() => {
      // console.warn('appendTo is ', props.appendTo, selector.get());
      return props.appendTo || selector.get();
    });

    const contentStyle = computed(() => props.style ?? {});

    const ariaHidden = signal(true);

    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && tryFocus(document.body);
      ariaHidden.set(true);
    };

    const stopWhenControlled = () => {
      if (unref(controlled)) {
        return true;
      }
      return;
    };

    const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && unref(trigger) === 'hover') {
        onOpen();
      }
    });

    const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
      if (unref(trigger) === 'hover') {
        onClose();
      }
    });

    const onBeforeEnter = () => {
      contentRef.get()?.updatePopper?.();
      onBeforeShow?.();
    };

    const onBeforeLeave = () => {
      onBeforeHide?.();
    };

    const onAfterShow = () => {
      onShow();
      stopHandle = onClickOutside(
        computed(() => {
          return contentRef.get()?.popperContentRef.get();
        }),
        () => {
          if (unref(controlled)) return;
          const $trigger = unref(trigger);
          if ($trigger !== 'hover') {
            onClose();
          }
        }
      );
    };

    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };

    const isFocusInsideContent = (event?: FocusEvent) => {
      const popperContent: HTMLElement | undefined = contentRef
        .get()?.popperContentRef.get();
      const activeElement =
        (event?.relatedTarget as Node) || document.activeElement;

      return popperContent?.contains(activeElement);
    };

    watch(
      () => unref(open),
      (val) => {
        if (!val) {
          stopHandle?.();
        } else {
          ariaHidden.set(false);
        }
      }
      // {
      //   flush: 'post',
      // }
    );

    watch(
      () => unref(props.content),
      () => {
        contentRef.get()?.updatePopper?.();
      }
    );

    defineExpose({
      /**
       * @description el-popper-content component instance
       */
      contentRef,
      /**
       * @description validate current focus event is trigger inside el-popper-content
       */
      isFocusInsideContent,
    });

    this.addChild(
      new TdTeleport({
        disabled: !props.teleported,
        to: appendTo,
        slot: new Transition({
          name: transitionClass.get(),
          onAfterLeave: onTransitionLeave,
          onBeforeEnter: onBeforeEnter,
          onAfterEnter: onAfterShow,
          onBeforeLeave: onBeforeLeave,
          // emits: {
          //   afterLeave: onTransitionLeave,
          //   beforeEnter: onBeforeEnter,
          //   afterEnter: onAfterShow,
          //   beforeLeave: onBeforeLeave,
          // },
          slot: new TdPopperContent({
            vIf: shouldRender, // todo 影响 to 的绑定
            vShow: shouldShow,
            refEl: contentRef,
            // v-bind="$attrs"
            boundariesPadding: props.boundariesPadding,
            fallbackPlacements: props.fallbackPlacements,
            gpuAcceleration: props.gpuAcceleration,
            offset: props.offset,
            placement: props.placement,
            popperOptions: props.popperOptions,
            strategy: props.strategy,
            effect: props.effect,
            enterable: props.enterable,
            pure: props.pure,
            popperClass: props.popperClass,
            popperStyle: [unref(props.popperStyle), contentStyle.get()],
            referenceEl: props.referenceEl,
            triggerTargetEl: props.triggerTargetEl,
            visible: shouldShow,
            attrObj: {
              id: id,
              arialLabel: props.ariaLabel,
              ariaHidden: ariaHidden,
              zIndex: props.zIndex,
            },
            events: {
              mouseenter: onContentEnter,
              mouseleave: onContentLeave,
              blur: onBlur,
              close: onClose,
            },
            slot: props.slot ?? props.slots?.default,
          }),
        }),
      })
    );
  }
}
