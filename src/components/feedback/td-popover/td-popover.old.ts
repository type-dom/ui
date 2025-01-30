import {
  Div,
  ISlotRaw,
  ISlotRef,
  TypeFragment,
  TypeNode,
} from '@type-dom/framework';
import { Computed, Signal } from '@type-dom/signals';
import { $fadeInLinearActive, $transition } from '../../../styles/transition';
import { TdTooltip } from '../td-tooltip/td-tooltip.class';
import { tdPopoverProps } from './td-popper.const';
import { ITdPopover, PopoverProps } from './td-popover.interface';
import { $popoverPopperStyle, $popoverTitleStyle } from './td-popover.style';

export class TdPopover extends TypeFragment implements ITdPopover {
  className: 'TdPopover';
  override props: PopoverProps;
  tooltip: TdTooltip;

  constructor(params: PopoverProps) {
    super();
    this.className = 'TdPopover';
    this.assignProps(tdPopoverProps);
    this.props = this.useParams(params);

    const gpuAcceleration = this.props.transition === $transition.fadeLinear;
    //`fade-in-linear`;
    const slot = params.slots?.reference;
    const content: (ISlotRaw | ISlotRef)[] = [];
    if (params.title) {
      content.push(
        new Div({
          attrObj: {
            role: 'title',
          },
          styleObj: $popoverTitleStyle, // todo
          slot: params.title,
        })
      );
    }
    if (!params.slot && params.content) {
      content.push(params.content);
    } else {
      if (typeof params.slot === 'string') {
        content.push(params.slot);
      } else if (params.slot instanceof TypeNode) {
        content.push(params.slot);
      } else if (params.slot instanceof Array) {
        content.push(...params.slot);
      }
    }

    // console.log('content is ', content);
    const popperStyle = Object.assign(
      {},
      $popoverPopperStyle,
      this.props.popperStyle,
      { width: this.props.width }
    );
    // console.warn('popperStyle.width is ', popperStyle.width);
    this.tooltip = new TdTooltip({
      //    ref="tooltipRef"
      //    v-bind="$attrs"
      virtualRef: params.virtualRef,
      //    :trigger="trigger"
      trigger: this.props.trigger,
      //    :placement="placement"
      placement: this.props.placement,
      //    :disabled="disabled"
      disabled: this.props.disabled,
      //    :visible="visible"
      visible: this.props.visible,
      //    :transition="transition"
      transition: this.props.transition,
      //    :popper-options="popperOptions"
      popperOptions: this.props.popperOptions,
      //    :tabindex="tabindex"
      // tabindex: this.props.tabindex,
      //    :content="content"
      content: this.props.content,
      //    :offset="offset"
      // offset: this.props.offset, // todo 默认值
      //    :show-after="showAfter"
      showAfter: this.props.showAfter,
      //    :hide-after="hideAfter"
      hideAfter: this.props.hideAfter,
      //    :auto-close="autoClose"
      autoClose: this.props.autoClose,
      //    :show-arrow="showArrow"
      showArrow: this.props.showArrow,
      //    :aria-label="title"
      ariaLabel: this.props.title,
      //    :effect="effect"
      effect: this.props.effect,
      //    :enterable="enterable"
      enterable: this.props.enterable,
      //    :popper-class="kls"
      //    :popper-style="style"
      popperStyle,
      //    :z-index="zIndex"
      // zIndex: this.props.zIndex,
      //    :teleported="teleported"
      teleported: this.props.teleported,
      //    :persistent="persistent"
      persistent: this.props.persistent,
      //    :gpu-acceleration="gpuAcceleration"
      gpuAcceleration: gpuAcceleration,
      //    @update:visible="onUpdateVisible"
      //    @before-show="beforeEnter"
      //    @before-hide="beforeLeave"
      //    @show="afterEnter"
      //    @hide="afterLeave",

      slot: slot,
      slots: {
        content: content,
      },
    });

    this.addChild(this.tooltip);
  }

  setVisible(visible: boolean) {
    if (visible) {
      this.tooltip?.contentRef?.get()?.contentRef?.get().setStyleObj({
        display: 'block',
        visibility: 'visible',
      });
      this.tooltip.onOpen?.();
      // this.tooltip.setVisible(true);
    } else {
      this.tooltip?.contentRef?.get()?.contentRef?.get().setStyleObj({
        display: 'none',
        visibility: 'hidden',
      });
      this.tooltip.onClose?.();
    }
  }
}
