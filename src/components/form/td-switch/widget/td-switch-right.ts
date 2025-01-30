import { TypeSpanProps, Span, TypeSpan, SvgSvg } from '@type-dom/framework';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { $switchLabel } from '../td-switch.style';
import { SwitchProps } from '../td-switch.interface';

export class TdSwitchRight extends TypeSpan {
  className: 'TdSwitchRight';
  override props: SwitchProps & TypeSpanProps;

  constructor(params: SwitchProps = {}) {
    super();
    this.className = 'TdSwitchRight';
    this.style.addObj({
      ...$switchLabel,
      marginLeft: '10px',
      // border: '1px solid var(--el-switch-
    });
    if (params?.activeIcon) {
      this.addChild(
        new TdIcon({
          slot: params.activeIcon,
        })
      );
    }
    if (!params?.activeIcon && params?.activeText) {
      this.addChild(
        new Span({
          slot: params.activeText,
        })
      );
    }
    this.props = this.useParams(params) as SwitchProps & TypeSpanProps;
  }
}
