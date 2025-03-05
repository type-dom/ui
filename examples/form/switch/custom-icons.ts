import { Br, Div, TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { ElCheckSvg, ElCloseSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class SwitchCustomIconsExample extends TypeDiv {
  className = 'SwitchCustomIconsExample';

  constructor() {
    super();
    const value1 = signal(true);
    const value2 = signal(true);

    this.addChildren(
      new TdSwitch({
        name: 'switch-icon',
        vModel: value1,
        activeIcon: new ElCheckSvg(),
        inactiveIcon: new ElCloseSvg()
      }),
      new Br(),
      new TdSwitch({
        name: 'switch-icon',
        vModel: value2,
        activeIcon: new ElCheckSvg(),
        inactiveIcon: new ElCloseSvg(),
        inlinePrompt: true
      })
    );
  }
}
