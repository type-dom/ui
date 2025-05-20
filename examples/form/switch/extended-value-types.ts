import { TypeDiv } from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { TdSwitch, TdTooltip } from '@type-dom/ui';

export class ExtendedValueTypes extends TypeDiv {
  className = 'ExtendedValueTypes';

 override  setup() {
    const value = signal('100');

    this.addChild(
      new TdTooltip({
        content: computed(() => 'Switch value: ' + value.get()),
        placement: 'top',
        slot: new TdSwitch({
          vModel: value,
          styleObj: {
            '--el-switch-on-color': '#13ce66',
            '--el-switch-off-color': '#ff4949',
          },
          activeValue: '100',
          inactiveValue: '0',
        }),
      })
    );
  }
}
