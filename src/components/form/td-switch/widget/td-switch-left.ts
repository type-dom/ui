import { Span, TypeSpan } from '@type-dom/framework';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { $switchLabel } from '../td-switch.style';
import { ITdSwitchConfig } from '../td-switch.interface';

export class TdSwitchLeft extends TypeSpan {
  className: 'TdSwitchLeft';
  override props: ITdSwitchConfig;

  constructor(params: ITdSwitchConfig = {}) {
    super();
    this.className = 'TdSwitchLeft';
    this.attr.addName('switch-label');
    this.style.addObj({
      ...$switchLabel,
      marginRight: '10px'
    });
    if (params?.inactiveIcon) {
      this.addChild(
        new TdIcon({
          svgObj: params.inactiveIcon
        })
      );
    }
    if (!params?.inactiveIcon && params?.inactiveText) {
      this.addChild(
        new Span({
          text: params.inactiveText
        })
      );
    }
    this.props = this.useParams(params);
  }
}
