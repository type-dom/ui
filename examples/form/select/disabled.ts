import { TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectDisabledExample extends TypeDiv {
  className: 'SelectDisabledExample';

  constructor() {
    super();
    this.className = 'SelectDisabledExample';

    const value = signal('')
    const options = [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ];
    this.addChildren(
      new TdSelect({
        vModel: value,
        placeholder: 'Select',
        size: 'large',
        styleObj: {
          width: 240,
        },
        slot: options.map(opt => new TdOption({
          label: opt.label,
          value: opt.value,
        })),
      }),
    );
  }
}
