import { Div, TypeDiv } from '@type-dom/framework';
import { TdRadio, TdRadioGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class FormRadioBasicExample extends TypeDiv {
  className: 'FormRadioBasicExample';

  constructor() {
    super();
    this.className = 'FormRadioBasicExample';
    this.attr.addName('form-radio-basic-example');

    const divStyle: IStyle = {
      marginLeft: '1em',
      marginBottom: '0.5em',
    };
    const radio1 = signal('1')
    const radio2 = signal('1')
    const radio3 = signal('1')
    this.addChildren(
      new Div({
        styleObj: divStyle,
        slot: new TdRadioGroup({
          name: 'radio-group1',
          vModel: radio1,
          styleObj: {
            marginBottom: '10px'
          },
          slot: [
            new TdRadio({
              label: 'Option 1',
              value: '1',
              size: 'large',
            }),
            new TdRadio({
              label: 'Option 2',
              value: '2',
              size: 'large',
            }),
          ]
        }),
      }),
      new Div({
        styleObj: divStyle,
        slot: new TdRadioGroup({
          name: 'radio-group2',
          vModel: radio2,
          styleObj: {
            marginBottom: '10px'
          },
          slot: [
            new TdRadio({
              label: 'Option 1',
              value: '1',
              size: 'default',
            }),
            new TdRadio({
              label: 'Option 2',
              value: '2',
              size: 'default',
            }),
          ]
        }),
      }),
      new Div({
        styleObj: divStyle,
        slot: new TdRadioGroup({
          name: 'radio-group3',
          vModel: radio3,
          styleObj: {
            marginBottom: '10px'
          },
          slot: [
            new TdRadio({
              label: 'Option 1',
              value: '1',
              size: 'small',
            }),
            new TdRadio({
              label: 'Option 2',
              value: '2',
              size: 'small',
            }),
          ]
        })
      })
    );
  }
}
