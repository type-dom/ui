import { defineExpose, Div, Span, TypeDiv } from '@type-dom/framework';
import { computed, Ref, toRefs } from '@type-dom/signals';
import { TdTooltip } from '../../../feedback/td-tooltip/td-tooltip.class';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useSliderButton } from '../composables/use-slider-button';
import { ITdSliderButton, SliderButtonInitData, SliderButtonProps } from './button.interface';
import { sliderButtonEmits, sliderButtonProps } from './button.const';

export class TdSliderButton extends TypeDiv implements ITdSliderButton {
  className: 'TdSliderButton';
  override props: SliderButtonProps;
  onButtonDown?: (event?: MouseEvent | TouchEvent) => void
  onKeyDown?: (event: KeyboardEvent) => void
  setPosition?: (newPosition: number) => Promise<void>
  hovering?: Ref<boolean>
  dragging?: Ref<boolean>
  constructor(params: SliderButtonProps = {}) {
    super();
    this.className = 'TdSliderButton';

    this.addEmits(sliderButtonEmits);
    this.assignProps(sliderButtonProps);
    this.props = this.useParams(params);
  }

  override setup() {

    const props = this.props
    const emit = this.emit;

    const ns = useNamespace('slider')

    const initData: SliderButtonInitData = {
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue,
    }

    const tooltipPersistent = computed(() =>
      !showTooltip ? false : persistent
    )

    const {
      disabled,
      button,
      tooltip,
      showTooltip,
      persistent,
      tooltipVisible,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition,
    } = useSliderButton(props, initData, emit)

    const { hovering, dragging } = toRefs(initData)

    defineExpose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging,
    })
    this.assignProps({
      refDom: button,
    });
    this.attr.addObj({
      class: [ns.e('button-wrapper'), { hover: hovering, dragging }],
      tabindex: disabled ? -1 : 0,
    });
    this.style.addObj(wrapperStyle)
    this.addEvents({
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave,
      mousedown: onButtonDown,
      focus: handleMouseEnter,
      blur: handleMouseLeave,
      keydown: onKeyDown,
    })
    this.addChild(
      new TdTooltip({
        refEl: tooltip,
        visible: tooltipVisible,
        placement: props.placement,
        fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        stopPopperMouseEvent: false,
        popperClass: props.tooltipClass,
        disabled: !showTooltip,
        persistent: tooltipPersistent.get(),
        slot: new Div({
          class: [ns.e('button'), { hover: hovering, dragging }],
        }),
        slots: {
          content: new Span({
            slot: formatValue,
          }),
        },
      })
    );
  }
}
