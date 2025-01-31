import { TypeDiv } from '@type-dom/framework';
import { TdCheckbox, TdCheckboxGroup } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class CheckboxIndeterminateExample extends TypeDiv {
  className: 'CheckboxIndeterminateExample';

  constructor() {
    super();
    this.className = 'CheckboxIndeterminateExample';
    this.attr.addName('check-intermediate-example');
  }

  override setup() {
    const checkAll = signal(false)
    const isIndeterminate = signal(true)
    const checkedCities = signal(['Shanghai', 'Beijing'])
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

    const handleCheckAllChange = (val: boolean) => {
      checkedCities.set(val ? cities : []);
      isIndeterminate.set(false);
    };
    const handleCheckedCitiesChange = (value: string[]) => {
      console.warn('handleCheckCitiesChange . ');
      const checkedCount = value.length;
      checkAll.set(checkedCount === cities.length);
      isIndeterminate.set(checkedCount > 0 && checkedCount < cities.length);
    };
    this.addChildren(
      new TdCheckbox({
        vModel: checkAll,
        refId: 'checkbox1',
        indeterminate: isIndeterminate,
        slot: 'Check all',
        emits: {
          change: handleCheckAllChange,
        }
      }),
      new TdCheckboxGroup({
        name: 'check-group',
        vModel: checkedCities,
        styleObj: {
          marginBottom: '10px'
        },
        emits: {
          change: handleCheckedCitiesChange,
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
