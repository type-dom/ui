import { TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectAllowCreateExample extends TypeDiv {
  className: 'SelectAllowCreateExample';

  constructor() {
    super();
    this.className = 'SelectAllowCreateExample';

    const value = signal<string[]>([])
    const options = [
      {
        value: 'HTML',
        label: 'HTML',
      },
      {
        value: 'CSS',
        label: 'CSS',
      },
      {
        value: 'JavaScript',
        label: 'JavaScript',
      }
    ];
    this.addChildren(
      new TdSelect({
        vModel: value,
        multiple: true,
        filterable: true,
        allowCreate: true,
        defaultFirstOption: true,
        reserveKeyword: false,
        placeholder: 'Select',
        styleObj: {
          width: 240,
        },
        slot: options.map(opt => new TdOption({
          label: opt.label,
          value: opt.value,
        })),
      })
    );
  }
}
