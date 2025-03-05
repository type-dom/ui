import { Br, TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SwitchSizeExample extends TypeDiv {
  className: 'SwitchSizeExample';

  constructor() {
    super();
    this.className = 'SwitchSizeExample';
    const value = signal(true)
    this.addChildren(
      new TdSwitch({
        name: 'switch-large',
        vModel: value,
        size: 'large',
        activeText: 'Open',
        inactiveText: 'Close'
      }),
      new Br(),
      new TdSwitch({
        name: 'switch-default',
        vModel: value,
        // size: 'default',
        activeText: 'Open',
        inactiveText: 'Close'
      }),
      new Br(),
      new TdSwitch({
        name: 'switch-small',
        vModel: value,
        size: 'small',
        activeText: 'Open',
        inactiveText: 'Close'
      })
    );
  }
}
