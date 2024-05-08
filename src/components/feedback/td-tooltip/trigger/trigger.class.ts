import { UI } from '../../../../ui/ui.abstract';
import { ITdTooltipTriggerConfig } from './trigger.interface';

export class TdTooltipTrigger extends UI {
  className: 'TdTooltipTrigger';
  constructor(config?: ITdTooltipTriggerConfig) {
    super();
    this.className = 'TdTooltipTrigger';
    this.setConfig(config);
  }
}
