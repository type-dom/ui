import { Div, TypeDiv } from '@type-dom/framework';
import { TdCheckboxButton, TdCheckboxGroup } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { signal } from '@type-dom/signals';

export class CheckboxButtonStyleExample extends TypeDiv {
  className: 'CheckboxButtonStyleExample';

  constructor() {
    super();
    this.className = 'CheckboxButtonStyleExample';
    const checkboxGroup1 = signal(['Shanghai']);
    const checkboxGroup2 = signal(['Shanghai']);
    const checkboxGroup3 = signal(['Shanghai']);
    const checkboxGroup4 = signal(['Shanghai']);
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
    const $demoButtonStyle: IStyle = {
      marginTop: '24px'
    };
    this.addChildren(
      new Div({
        slot:  new TdCheckboxGroup({
          name: 'check-group1',
          vModel: checkboxGroup1,
          size: 'large',
          slot: cities.map(city => new TdCheckboxButton({
            // label: city,
            value: city,
            slot: city,
            // size: 'large'
          })),
        })
      }),
      new Div({
        styleObj: $demoButtonStyle,
        slot: new TdCheckboxGroup({
          name: 'check-group2',
          vModel: checkboxGroup2,
          slot: cities.map(city => new TdCheckboxButton({
            // label: city,
            value: city,
            slot: city,
          }))
        })
      }),
      new Div({
        styleObj: $demoButtonStyle,
        slot: new TdCheckboxGroup({
          name: 'check-group3',
          vModel: checkboxGroup3,
          size: 'small',
          slot: cities.map(city => new TdCheckboxButton({
            // label: city,
            value: city,
            slot: city,
            disabled: city === 'Beijing'
          }))
        })
      }),
      new Div({
        styleObj: $demoButtonStyle,
        slot: new TdCheckboxGroup({
          name: 'check-group4',
          vModel: checkboxGroup4,
          size: 'small',
          disabled: true,
          slot: cities.map(city => new TdCheckboxButton({
            // label: city,
            value: city,
            slot: city,
          }))
        })
      })
    );
  }
}
