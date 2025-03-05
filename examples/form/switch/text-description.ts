import { Br, TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SwitchTextExample extends TypeDiv {
  className: 'SwitchTextExample';

  constructor() {
    super();
    this.className = 'SwitchTextExample';
    const mb2 = {
      marginLeft: '.5rem',
    }
    const value1 = signal(true)
    const value2 = signal(true)
    const value3 = signal(true)
    const value4 = signal(true)
    const value5 = signal(true)
    const value6 = signal(true)
    this.addChildren(
      new TdSwitch({
        name: 'switch-text',
        vModel: value1,
        activeText: 'Pay by month',
        inactiveText: 'Pay by year',
        styleObj: mb2,
      }),
      new Br(),
      new TdSwitch({
        name: 'switch-text',
        vModel: value2,
        switchOnColor: '#13ce66',
        switchOffColor: '#ff4949',
        activeText: 'Pay by month',
        inactiveText: 'Pay by year',
        styleObj: mb2,
      }),
      new Br(),
      new TdSwitch({
        name: 'switch-text',
        vModel: value3,
        inlinePrompt: true,
        activeText: '是',
        inactiveText: '否'
      }),
      new TdSwitch({
        name: 'switch-text',
        vModel: value4,
        inlinePrompt: true,
        activeText: 'Y',
        inactiveText: 'N',
        switchOnColor: '#13ce66',
        switchOffColor: '#ff4949',
        styleObj: mb2,
      }),
      new TdSwitch({
        name: 'switch-text',
        vModel: value5,
        width: 60,
        inlinePrompt: true,
        activeText: '超出省略',
        inactiveText: '超出省略',
        styleObj: mb2,
      }),
      new TdSwitch({
        name: 'switch-text',
        vModel: value6,
        inlinePrompt: true,
        activeText: '完整展示多个内容',
        inactiveText: '多个内容',
        switchOnColor: '#13ce66',
        switchOffColor: '#ff4949',
        styleObj: mb2,
      })
    );
  }
}
