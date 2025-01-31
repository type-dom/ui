import { TypeDiv } from '@type-dom/framework';
import { TdRadio } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormRadioDisabledExample extends TypeDiv {
  className: 'FormRadioDisabledExample';

  constructor() {
    super();
    this.className = 'FormRadioDisabledExample';
    this.attr.addName('form-radio-disabled-example');

    const radio = signal('selected and disabled')
    this.addChildren(
      new TdRadio({
        vModel: radio,
        label: 'Option A',
        value: 'disabled',
        disabled: true
      }),
      new TdRadio({
        vModel: radio,
        label: 'Option B',
        value: 'selected and disabled',
        disabled: true
      })
    );
  }
}
