// import {
//   arrow,
//   autoUpdate,
//   computePosition,
//   offset,
//   autoPlacement,
//   detectOverflow,
//   flip,
//   shift,
//   hide,
// } from '@type-dom/popper';
import { defineExpose, provide, Fragment, Span, TypeFragment, } from '@type-dom/framework';
import { isBoolean } from '@type-dom/utils';
import { computed, Signal, signal, toRaw, unref, watch } from '@type-dom/signals';
import { useDelayedToggle } from '../../../hooks/use-delayed-toggle';
import { usePopperContainer } from '../../../hooks/use-popper-container';
import { useId } from '../../../hooks/use-id';
import { useNamespace } from '../../../hooks/use-namespace/index';
import { TdPopper } from '../td-popper/td-popper.class';
import { TdPopperArrow } from '../td-popper/arrow/arrow.class';
import { ITdTooltip, TooltipProps } from './td-tooltip.interface';
import { TOOLTIP_INJECTION_KEY, tooltipProps, useTooltipModelToggle, } from './td-tooltip.const';
import { TdTooltipContent } from './content/content.class';
import { TdTooltipTrigger } from './trigger/trigger.class';

export class TdTooltip extends TypeFragment implements ITdTooltip {
  className: 'TdTooltip';
  override props: TooltipProps;
  popperRef?: Signal<TdPopper | undefined>;
  contentRef?: Signal<TdTooltipContent | undefined>;
  isFocusInsideContent?: (event?: FocusEvent) => undefined | boolean;

  onOpen?: (event?: Event | undefined) => void;
  onClose?: (event?: Event | undefined) => void;
  hide?: (event?: Event | undefined) => void;
  onBeforeShow?: () => void;
  onBeforeHide?: () => void;
  updatePopper?: () => void;

  constructor(params: TooltipProps = {}) {
    super();
    this.className = 'TdTooltip';
    // console.log('TdTooltip . ');
    // this.addEmits(tooltipEmits);
    // 要设置默认值，否则使用 创建 TooltipTrigger/TooltipContent 时，会确认默认值。。
    this.assignProps(tooltipProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    usePopperContainer();

    const ns = useNamespace('tooltip')
    const id = useId();
    const popperRef = signal<TdPopper>();
    const contentRef = signal<TdTooltipContent>();

    const updatePopper = () => {
      // console.log('updatePopper . ');
      const popperComponent = unref(popperRef);
      if (popperComponent) {
        // popperComponent.popperInstanceRef?.get()？.update()
        popperComponent.popperInstanceRef?.get()?.update();
      }
    };
    const open = signal(false);
    const toggleReason = signal<Event>();

    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason,
    });

    const { onOpen, onClose } = useDelayedToggle({
      showAfter: props.showAfter,
      hideAfter: props.hideAfter,
      autoClose: props.autoClose,
      open: show,
      close: hide,
    });

    const controlled = computed(() => {
      // console.warn('controlled computed . );
      // console.warn('!hasUpdateHandler.get() is ', !hasUpdateHandler.get());
      return isBoolean(toRaw(props.visible)) && !hasUpdateHandler.get(); // todo
    });

    const kls = computed(() => {
      return [ns.b(), unref(props.popperClass)!];
    })

    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: open, // readonly(open),
      trigger: signal(props.trigger),
      onOpen: (event?: Event) => {
        // console.log('TdTooltip onOpen . ', event);
        onOpen(event);
      },
      onClose: (event?: Event) => {
        onClose(event);
      },
      onToggle: (event?: Event) => {
        if (unref(open)) {
          onClose(event);
        } else {
          onOpen(event);
        }
      },
      onShow: () => {
        emit('show', toggleReason.get());
      },
      onHide: () => {
        emit('hide', toggleReason.get());
      },
      onBeforeShow: () => {
        emit('beforeShow', toggleReason.get());
      },
      onBeforeHide: () => {
        emit('beforeHide', toggleReason.get());
      },
      updatePopper,
    });

    watch(
      () => unref(props.disabled),
      (disabled) => {
        if (disabled && open.get()) {
          open.set(false);
        }
      }
    );

    const isFocusInsideContent = (event?: FocusEvent) => {
      return contentRef.get()?.isFocusInsideContent?.(event);
    };

    // onDeactivated(() => open.get() && hide())

    defineExpose({
      /**
       * @description el-popper component instance
       */
      popperRef,
      /**
       * @description el-tooltip-content component instance
       */
      contentRef,
      /**
       * @description validate current focus event is trigger inside el-tooltip-content
       */
      isFocusInsideContent,
      /**
       * @description update el-popper component instance
       */
      updatePopper,
      /**
       * @description expose onOpen function to mange el-tooltip open state
       */
      onOpen,
      /**
       * @description expose onOpen function to mange el-tooltip open state
       */
      onClose,
      /**
       * @description expose hide function
       */
      hide,
    });

    this.addChild(
      new TdPopper({
        refEl: popperRef,
        attrObj: {
          role: props.role,
        },
        slot: [
          new TdTooltipTrigger({
            disabled: props.disabled,
            trigger: props.trigger,
            triggerKeys: props.triggerKeys,
            virtualRef: props.virtualRef,
            virtualTriggering: props.virtualTriggering,
            slot: props.slot ?? props.slots?.default,
          }),
          new TdTooltipContent({
            refEl: contentRef,
            boundariesPadding: props.boundariesPadding,
            content: props.content,
            effect: props.effect,
            enterable: props.enterable,
            fallbackPlacements: props.fallbackPlacements,
            hideAfter: props.hideAfter,
            gpuAcceleration: props.gpuAcceleration,
            offset: props.offset,
            persistent: props.persistent,
            popperClass: kls,
            popperStyle: props.popperStyle,
            placement: props.placement,
            popperOptions: props.popperOptions,
            arrowOffset: props.arrowOffset,
            pure: props.pure,
            rawContent: props.rawContent,
            referenceEl: props.referenceEl,
            triggerTargetEl: props.triggerTargetEl,
            showAfter: props.showAfter,
            strategy: props.strategy,
            teleported: props.teleported,
            transition: props.transition,
            virtualTriggering: props.virtualTriggering,
            appendTo: props.appendTo,
            attrObj: {
              ariaLabel: props.ariaLabel,
              disabled: props.disabled,
              zIndex: props.zIndex,
            },
            slot: [
              new Fragment({
                slot: props.slots?.content ?? [
                  props.rawContent
                    ? new Span({
                        html: props.content,
                      })
                    : new Span({
                        slot: props.content,
                      }),
                ],
              }),
              new TdPopperArrow({
                vIf: props.showArrow,
              }),
            ],
          }),
        ],
      })
    );
  }
}
