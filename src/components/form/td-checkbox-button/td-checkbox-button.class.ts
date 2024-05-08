import { UI } from '../../../ui/ui.abstract';
import { ITdCheckboxButton } from './td-checkbox-button.interface';
import { ITdCheckboxConfig } from '../td-checkbox/td-checkbox.interface';
import { Input, Span } from '@type-dom/framework';

export class TdCheckboxButton extends UI implements ITdCheckboxButton {
  className: 'TdCheckboxButton';

  constructor(config: ITdCheckboxConfig) {
    super({ tag: 'label' });
    this.className = 'TdCheckboxButton';
    const originalInput = new Input({});
    const labelSpan = new Span({});

    this.setConfig(config);
  }
}
