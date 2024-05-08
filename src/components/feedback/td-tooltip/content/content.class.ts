import { UI } from '../../../../ui/ui.abstract';
import { ITdTooltipContentConfig } from './content.interface';

export class TdTooltipContent extends UI {
  className: 'TdTooltipContent';
  constructor(config?: ITdTooltipContentConfig) {
    super();
    this.className = 'TdTooltipContent';
    this.setConfig(config);
  }
}
