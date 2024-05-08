import { UI } from '../../../../ui/ui.abstract';
import { ITdPopperTrigger, ITdPopperTriggerConfig } from './trigger.interface';

export class TdPopperTrigger extends UI implements ITdPopperTrigger {
  className : 'TdPopperTrigger';
  constructor(config?: ITdPopperTriggerConfig) {
    super();
    this.className = 'TdPopperTrigger';

  }
}
