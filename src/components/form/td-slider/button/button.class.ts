import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdTooltip } from '../../../feedback/td-tooltip/td-tooltip.class';
import {
  $sliderButtonStyle,
  $sliderButtonWrapperStyle,
} from '../td-slider.style';
import { ITdSliderButton, ITdSliderButtonConfig } from './button.interface';

export class TdSliderButton extends TypeDiv implements ITdSliderButton {
  className: 'TdSliderButton';

  constructor(params: ITdSliderButtonConfig = {}) {
    super();
    this.className = 'TdSliderButton';
    this.style.addObj($sliderButtonWrapperStyle);
    // this.style.addObj(params.wrapperStyle)
    this.addEvents({
      // mouseenter: () => {},
      // mouseleave: () => {},
      // mousedown: () => {},
      // focus: () => {},
      // blur: () => {},
      // keydown: () => {},
    });
    this.addChild(
      new TdTooltip({
        placement: params.placement,
        fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        stopPopperMouseEvent: false,
        // disabled: !showTooltip,
        // persistent: showTooltip,
        slot: new Div({
          styleObj: $sliderButtonStyle,
        }),
        slots: {
          content: new Span({
            // slot: formatValue,
          }),
        },
      })
    );
  }
}
