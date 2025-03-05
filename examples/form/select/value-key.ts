import { Div, TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

type Option = {
  id: number
  label: string
  desc: string
}
export class SelectValueKeyExample extends TypeDiv {
  className: 'SelectValueKeyExample';

  constructor() {
    super();
    this.className = 'SelectValueKeyExample';

    const value = signal<Option>()
    const options = signal([
      { id: 1, label: 'Option A', desc: 'Option A - 230506' },
      { id: 2, label: 'Option B', desc: 'Option B - 230506' },
      { id: 3, label: 'Option C', desc: 'Option C - 230506' },
      { id: 4, label: 'Option A', desc: 'Option A - 230507' },
    ])
    this.addChildren(
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new TdSelect({
            vModel: value,
            valueKey: 'id',
            placeholder: 'Select',
            styleObj: {
              width: 240,
            },
            slot: options.get().map(opt => new TdOption({
              label: opt.label,
              value: opt,
            })),
          })
        ]
      })
    );
  }
}
