import { Span, TypeSpan } from '@type-dom/framework';
import { $switchLabel } from '../td-switch.style';
import { ITdSwitchConfig } from '../td-switch.interface';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';

export class TdSwitchRight extends TypeSpan {
  className: 'TdSwitchRight';
  override props: ITdSwitchConfig;

  constructor(params: ITdSwitchConfig = {}) {
    super();
    this.className = 'TdSwitchRight';
    this.style.addObj({
      ...$switchLabel,
      marginLeft: '10px'
      // border: '1px solid var(--el-switch-
    });
    if (params?.activeIcon) {
      this.addChild(
        new TdIcon({
          svgObj: params.activeIcon
        })
      );
    }
    if (!params?.activeIcon && params?.activeText) {
      this.addChild(
        new Span({
          text: params.activeText
        })
      );
    }
    this.props = this.useParams(params);
  }
}
