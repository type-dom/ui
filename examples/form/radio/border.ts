import { Br, Div, TypeDiv } from '@type-dom/framework';
import { TdRadio, TdRadioGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormRadioBorderExample extends TypeDiv {
  className: 'FormRadioBorderExample';

  constructor() {
    super();
    this.className = 'FormRadioBorderExample';
    this.attr.addName('form-radio-border-example');

    const radio1 = signal('1')
    const radio2 = signal('1')
    const radio3 = signal('1')
    const radio4 = signal('1')
    this.addChildren(
      new Div({
        slot: new TdRadioGroup({
          name: 'radio-group',
          vModel: radio1,
          size: 'large',
          styleObj: {
            marginBottom: '10px'
          },
          slot: [
            new TdRadio({
              label: 'Option A',
              value: '1',
              checked: true,
              border: true
            }),
            new TdRadio({
              label: 'Option B',
              value: '2',
              checked: false,
              border: true
            })
          ]
        }),
      }),
      new Div({
        styleObj: {
          marginBottom: '10px'
        },
        slot:  new TdRadioGroup({
          name: 'radio-group',
          vModel: radio2,
          slot: [
            new TdRadio({
              label: 'Option A',
              value: '1',
              border: true
            }),
            new TdRadio({
              label: 'Option B',
              value: '2',
              border: true
            })
          ]
        }),
      }),
      new Div({
        slot: new TdRadioGroup({
          name: 'radio-group',
          vModel: radio3,
          size: 'small',
          styleObj: {
            marginBottom: '10px'
          },
          slot: [
            new TdRadio({
              label: 'Option A',
              value: '1',
              border: true
            }),
            new TdRadio({
              label: 'Option B',
              value: '2',
              disabled: true,
              border: true
            })
          ]
        }),
      }),
      new Div({
        styleObj: {
          marginBottom: '10px'
        },
        slot: new TdRadioGroup({
          name: 'radio-group',
          vModel: radio4,
          disabled: true,
          size: 'small',
          slot: [
            new TdRadio({
              label: 'Option A',
              value: '1',
              border: true
            }),
            new TdRadio({
              label: 'Option B',
              value: '2',
              border: true
            }),
          ]
        })
      }),
    );
  }
}
