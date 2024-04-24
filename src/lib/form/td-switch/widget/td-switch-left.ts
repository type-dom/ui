import { Span, TypeSpan } from '@type-dom/framework';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { $switchLabel } from '../td-switch.style';
import { ITdSwitchConfig } from '../td-switch.interface';

export class TdSwitchLeft extends TypeSpan {
  className: 'TdSwitchLeft';
  override config?: ITdSwitchConfig;

  constructor(config?: ITdSwitchConfig) {
    super();
    this.className = 'TdSwitchLeft';
    this.config = config;
    this.addAttrName('switch-label');
    this.addStyleObj({
      ...$switchLabel,
      marginRight: '10px'
    });
    if (config?.inactiveIcon) {
      this.addChild(new TdIcon({
        svgObj: config.inactiveIcon
      }));
    }
    if (!config?.inactiveIcon && config?.inactiveText) {
      this.addChild(new Span({
        text: config.inactiveText
      }));
    }
  }
}
