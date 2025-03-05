import { TypeDiv } from '@type-dom/framework';
import { CheckboxValueType, TdCheckbox, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectCustomHeaderExample extends TypeDiv {
  className: 'SelectCustomHeaderExample';

  constructor() {
    super();
    this.className = 'SelectCustomHeaderExample';

    const checkAll = signal(false)
    const indeterminate = signal(false)
    const value = signal<CheckboxValueType[]>([])
    const cities = [
      {
        value: 'Beijing',
        label: 'Beijing',
      },
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Nanjing',
        label: 'Nanjing',
      },
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
    ];
    const handleCheckAll = (val: CheckboxValueType) => {
      indeterminate.set(false)
      if (val) {
        value.set(cities.map((_) => _.value))
      } else {
        value.set([]);
      }
    }
    this.addChildren(
      new TdSelect({
        vModel: value,
        clearable: true,
        collapseTags: true,
        placeholder: 'Select',
        maxCollapseTags: 1,
        styleObj: {
          width: 240,
        },
        slots: {
          header: new TdCheckbox({
            vModel: checkAll,
            // indeterminate,
            emits: {
              change: handleCheckAll,
            }
          })
        },
        slot: cities.map(opt => new TdOption({
          label: opt.label,
          value: opt.value,
        })),
      })
    );
  }
}
