import { TextNode, TypeDiv } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { isString } from '@type-dom/utils';
import { useNamespace } from '../../../../hooks/use-namespace';
import { SliderMarkerProps } from './mark.interface';

export class TdSliderMarker extends TypeDiv {
  className: 'TdSliderMarker';
  override props: SliderMarkerProps;
  constructor(params: SliderMarkerProps = {}) {
    super();
    this.className = 'TdSliderMarker';
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('slider')
    const label = computed(() => {
      return isString(props.mark) ? props.mark : props.mark!.label
    })
    const style = computed(() =>
      isString(props.mark) ? undefined : props.mark!.style
    )

    this.attr.addClass(ns.e('marks-text'));
    this.style.addObj(style);
    // this.addChild(new TextNode(label)); // 会重复
    this.slotChildren(label);
  }
}
