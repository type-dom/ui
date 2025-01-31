import { TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SwitchLoadingExample extends TypeDiv {
  className: 'SwitchLoadingExample';
  private loading: boolean;

  constructor() {
    super();
    this.className = 'SwitchLoadingExample';
    this.loading = false;
    const value1 = signal(true);
    const value2 = signal(false);
    this.addChildren(
      new TdSwitch({
        name: 'switch-loading',
        vModel: value1,
        loading: true,
        styleObj: {
          marginRight: '20px'
        }
      }),
      new TdSwitch({
        name: 'switch-normal',
        vModel: value2,
        loading: true,
      })
    );
  }
}
