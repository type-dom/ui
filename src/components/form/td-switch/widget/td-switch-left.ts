import { TypeSpanProps, Span, TypeSpan } from '@type-dom/framework';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { $switchLabel } from '../td-switch.style';
import { SwitchProps } from '../td-switch.interface';

export class TdSwitchLeft extends TypeSpan {
  className: 'TdSwitchLeft';
  override props: SwitchProps & TypeSpanProps;

  constructor(params: SwitchProps = {}) {
    super();
    this.className = 'TdSwitchLeft';
    this.attr.addName('switch-label');
    this.style.addObj({
      ...$switchLabel,
      marginRight: '10px',
    });
    if (params?.inactiveIcon) {
      this.addChild(
        new TdIcon({
          slot: params.inactiveIcon,
        })
      );
    }
    if (!params?.inactiveIcon && params?.inactiveText) {
      this.addChild(
        new Span({
          slot: params.inactiveText,
        })
      );
    }
    this.props = this.useParams(params) as SwitchProps & TypeSpanProps;
  }
}
