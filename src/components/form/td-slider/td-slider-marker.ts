import { TypeDivProps, TextNode, TypeDiv, TypeNode } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { isString } from '@type-dom/utils';
import { $sliderMarksTextStyle } from './td-slider.style';

export interface ITdSliderMarkerConfig extends TypeDivProps {
  mark:
    | string
    | {
        style: IStyle;
        label: string | TypeNode;
      };
}

export class TdSliderMarker extends TypeDiv {
  className: 'TdSliderMarker';
  override props: ITdSliderMarkerConfig;

  constructor(params: ITdSliderMarkerConfig) {
    super();
    this.className = 'TdSliderMarker';
    const label = isString(params.mark) ? params.mark : params.mark!.label;
    this.style.addObj($sliderMarksTextStyle);
    const style = isString(params.mark) ? undefined : params.mark!.style;
    this.style.addObj(style);
    this.slotChildren(label);
    this.props = this.useParams(params);
  }
}
