import { TypeDiv } from '@type-dom/framework';
import { TdCheckbox, TdCheckboxGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class CheckboxLimitationExample extends TypeDiv {
  className: 'CheckboxLimitationExample';

  constructor() {
    super();
    this.className = 'CheckboxLimitationExample';
    this.attr.addName('check-limitation-example');

    const checkedCities = signal(['Shanghai', 'Beijing']);
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
    this.addChildren(
      new TdCheckboxGroup({
        name: 'check-group',
        vModel: checkedCities,
        min: 1,
        max: 2,
        styleObj: {
          marginBottom: '10px'
        },
        slot: cities.map(city => new TdCheckbox({
          label: city,
          value: city,
          slot: city,
        })),
      }),
    );
  }
}
