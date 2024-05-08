import { Span, TypeSpan } from '@type-dom/framework';
import { ITdSwitchConfig, TdIcon } from '@type-dom/ui';
import { $switchLabel } from '../td-switch.style';

export class TdSwitchRight extends TypeSpan {
  className: 'TdSwitchRight';
  override config?: ITdSwitchConfig;

  constructor(config?: ITdSwitchConfig) {
    super();
    this.className = 'TdSwitchRight';
    this.config = config;
    this.addStyleObj({
      ...$switchLabel,
      marginLeft: '10px'
      // border: '1px solid var(--el-switch-
    });
    if (config?.activeIcon) {
      this.addChild(new TdIcon({
        svgObj: config.activeIcon
      }));
    }
    if (!config?.activeIcon && config?.activeText) {
      this.addChild(new Span({
        text: config.activeText
      }));
    }
  }
}
