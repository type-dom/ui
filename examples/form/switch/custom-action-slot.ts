import { Span, TypeDiv } from '@type-dom/framework';
import { TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SwitchActionSlotExample extends TypeDiv {
  className: 'SwitchActionText';

  constructor() {
    super();
    this.className = 'SwitchActionText';
    const value = signal(true);
    this.addChildren(
      new TdSwitch({
        name: 'switch-custom-action-icon',
        vModel: value,
        slots: {
          activeAction: new Span({ slot: 'T' }),
          inactiveAction: new Span({ slot: 'F' }),
        },
      })
    );
  }
}
