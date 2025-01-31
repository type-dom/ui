import { Div, TypeDiv } from '@type-dom/framework';
import { TdRadioButton, TdRadioGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormRadioButtonExample extends TypeDiv {
  className: 'FormRadioButtonExample';

  constructor() {
    super();
    this.className = 'FormRadioButtonExample';

    const radio1 = signal('New York')
    const radio2 = signal('New York')
    const radio3 = signal('New York')
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
            new TdRadioButton({
              label: 'New York',
              value: 'New York',
            }),
            new TdRadioButton({
              label: 'Washington',
              value: 'Washington',
            }),
            new TdRadioButton({
              label: 'Los Angeles',
              value: 'Los Angeles',
            }),
            new TdRadioButton({
              label: 'Chicago',
              value: 'Chicago',
            }),
          ]
        }),
      }),
      new Div({
        styleObj: {
          marginBottom: '10px'
        },
        slot: new TdRadioGroup({
          name: 'radio-group',
          vModel: radio2,
          slot: [
            new TdRadioButton({
              label: 'New York',
              value: 'New York'
            }),
            new TdRadioButton({
              label: 'Washington',
              value: 'Washington'
            }),
            new TdRadioButton({
              label: 'Los Angeles',
              value: 'Los Angeles'
            }),
            new TdRadioButton({
              label: 'Chicago',
              value: 'Chicago'
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
          vModel: radio3,
          size: 'small',
          slot: [
            new TdRadioButton({
              label: 'New York',
              value: 'New York',
            }),
            new TdRadioButton({
              label: 'Washington',
              value: 'Washington',
              disabled: true
            }),
            new TdRadioButton({
              label: 'Los Angeles',
              value: 'Los Angeles',
            }),
            new TdRadioButton({
              label: 'Chicago',
              value: 'Chicago',
            }),
          ]
        })
      })
    );
  }
}
