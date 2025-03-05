import { TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SwitchDisabledExample extends TypeDiv {
  className: 'SwitchDisabledExample';

  constructor() {
    super();
    this.className = 'SwitchDisabledExample';
    const value1 = signal(true);
    const value2 = signal(true);
    this.addChildren(
      new TdSwitch({
        name: 'switch-disabled',
        vModel: value1,
        disabled: true,
        styleObj: {
          marginRight: '20px'
        }
      }),
      new TdSwitch({
        name: 'switch-normal',
        vModel: value2,
      })
    );
  }
}
