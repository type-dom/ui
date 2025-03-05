import { TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectDisabledOptionExample extends TypeDiv {
  className: 'SelectDisabledOptionExample';

  constructor() {
    super();
    this.className = 'SelectDisabledOptionExample';

    const value = signal('')
    const options: {
      label: string,
      value: string,
      disabled?: boolean,
    }[] = [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
        disabled: true,
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
          disabled: opt.disabled,
        })),
      }),
    );
  }
}
