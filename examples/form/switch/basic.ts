import { TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class SwitchBasicExample extends TypeDiv {
  className: 'SwitchBasicExample';

  constructor() {
    super();
    this.className = 'SwitchBasicExample';

    const value1 = signal(true);
    const value2 = signal(true);
    this.addChildren(
      new TdSwitch({
        name: 'first',
        vModel: value1,
      }),
      new TdSwitch({
        name: 'second',
        switchOnColor: '#13ce66',
        switchOffColor: '#ff4949',
        vModel: value2,
        styleObj: {
          // '--td-switch-on-color': '#13ce66',
          // '--td-switch-off-color': '#ff4949',
          marginLeft: '6px'
        } as IStyle,
      })
    );
  //    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
  }
}
