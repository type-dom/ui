import { TypeDiv } from '@type-dom/framework';
import {
  ITdSlider,
  ITdSliderConfig,
  sliderEmits,
  SliderInitData,
} from './td-slider.interface';
import { $sliderStyle } from './td-slider.style';

export class TdSlider extends TypeDiv implements ITdSlider {
  className: 'TdSlider';

  constructor(params: ITdSliderConfig = {}) {
    super();
    this.className = 'TdSlider';
    this.style.addObj($sliderStyle);

    this.addEmits(sliderEmits);
  }

  override setup() {
    const props = this.props;
    const initData: SliderInitData = {
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1,
    };

    // const {
    //   elFormItem,
    //   slider,
    //   firstButton,
    //   secondButton,
    //   sliderDisabled,
    //   minValue,
    //   maxValue,
    //   runwayStyle,
    //   barStyle,
    //   resetSize,
    //   emitChange,
    //   onSliderWrapperPrevent,
    //   onSliderClick,
    //   onSliderDown,
    //   onSliderMarkerDown,
    //   setFirstValue,
    //   setSecondValue,
    // } = useSlide(props, initData, this.emit)
    // const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    //   formItemContext: elFormItem,
    // })
    //
    // const isLabeledByFormItem = params.isLabeledByFormItem ?? true;
    // const groupLabel = params.range ? params.range.label : undefined;
    // this.attr.addObj({
    //   role: params.range ? 'group' : undefined,
    //   ariaLabel: params.range && !isLabeledByFormItem ? groupLabel : undefined,
    //   ariaLabelledBy: params.range && isLabeledByFormItem ? tdFormItem?.labelId : undefined,
    // })
  }
}
