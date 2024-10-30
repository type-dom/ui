import { UI } from '../../../../ui/ui.abstract';
import { ITdTooltipTriggerConfig } from './trigger.interface';

export class TdTooltipTrigger extends UI {
  className: 'TdTooltipTrigger';
  override props: ITdTooltipTriggerConfig;

  constructor(params: ITdTooltipTriggerConfig = {}) {
    super();
    this.className = 'TdTooltipTrigger';
    this.props = this.useParams(params);
  }
}
