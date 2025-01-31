import { TypeDiv } from '@type-dom/framework';
import { TdCheckbox, TdCheckboxGroup } from '@type-dom/ui';

export class CheckboxIndeterminateExample extends TypeDiv {
  className: 'CheckboxIndeterminateExample';

  constructor() {
    super();
    this.className = 'CheckboxIndeterminateExample';
    this.attr.addName('check-intermediate-example');
  }

  override setup() {
    let checkAll = false;
    let isIndeterminate = true;
    const checkedCities = ['Shanghai', 'Beijing']; // 只有赋值时有用。 事件中，props.modelValue会重新赋值的。
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
    const handleCheckAllChange = (evt: InputEvent) => {
      console.warn('handleCheckAllChange . ');
      const val = (evt.target as HTMLInputElement).checked;
      isIndeterminate = false;
      const group = this.down<TdCheckboxGroup>('className', 'TdCheckboxGroup');
      group.props.modelValue = val ? cities : [];
      group.childNodes.forEach((child) => {
        if (child instanceof TdCheckbox) {
          // child.setChecked(val);
        }
      });
    };

    const handleCheckedCitiesChange = (value: string[]) => {
      console.warn('handleCheckedCitiesChange . ', value);
      const group = this.down<TdCheckboxGroup>('className', 'TdCheckboxGroup');
      const checkedCount = group.props.modelValue.length;
      checkAll = checkedCount === cities.length;
      const checkbox = this.down<TdCheckbox>('refId', 'checkbox1');
      if (checkAll) {
        // checkbox.props.indeterminate = false;
        // checkbox.setChecked(true);
        return;
      }
      isIndeterminate = checkedCount > 0 && checkedCount < cities.length;
      if (isIndeterminate) {
        console.log('isIndeterminate is ', isIndeterminate);
        // checkbox.setIndeterminate(true);
      } else {
        // checkbox.setIndeterminate(false);
        // checkbox.setChecked(false);
      }
    };
    this.addChildren(
      new TdCheckbox({
        modelValue: checkAll,
        refId: 'checkbox1',
        // indeterminate: isIndeterminate,
        slot: 'Check all',
        emits: {
          change: handleCheckAllChange,
        }
      }),
      new TdCheckboxGroup({
        name: 'check-group',
        modelValue: checkedCities,
        styleObj: {
          marginBottom: '10px'
        },
        emits: {
          change: handleCheckedCitiesChange,
        },
        init: (element) => {
          for (const city of cities) {
            element.addChild(new TdCheckbox({
              label: city,
              value: city,
              slot: city,
            }))
          }
        }
      }),
    );
  }
}
