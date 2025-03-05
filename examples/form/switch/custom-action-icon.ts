import { TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { ElHideSvg, ElViewSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class SwitchActionIconExample extends TypeDiv {
  className: 'SwitchActionIconExample';

  constructor() {
    super();
    this.className = 'SwitchActionIconExample';
    const value = signal(true);
    this.addChild(
      new TdSwitch({
        name: 'switch-custom-icon',
        vModel: value,
        activeActionIcon: new ElViewSvg(),
        inactiveActionIcon: new ElHideSvg()
      })
    );
  }
}
