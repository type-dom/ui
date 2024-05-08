import { UI } from '../../../ui/ui.abstract';
import { ITdPopper, ITdPopperConfig } from './td-popper.interface';

export class TdPopper extends UI implements ITdPopper {
  className: 'TdPopper';
  constructor(config?: ITdPopperConfig) {
    super();
    this.className = 'TdPopper';
    this.setConfig(config);
  }
}
