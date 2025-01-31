import { TypeDiv } from '@type-dom/framework';
import { TdRadio, TdRadioGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormRadioGroupExample extends TypeDiv {
  className: 'FormRadioGroupExample';

  constructor() {
    super();
    this.className = 'FormRadioGroupExample';
    this.attr.addName('form-radio-group-example');
    this.style.addObj({
      padding: '1em 0'
    });

    const radio = signal(3);
    this.addChildren(
      new TdRadioGroup({
        name: 'radio-group',
        vModel: radio,
        styleObj: {
          marginBottom: '10px'
        },
        slot: [
          new TdRadio({
            label: 'Option A',
            value: 3,
          }),
          new TdRadio({
            label: 'Option B',
            value: 6
          }),
          new TdRadio({
            label: 'Option C',
            value: 9
          })
        ]
      })
    );
  }
}
