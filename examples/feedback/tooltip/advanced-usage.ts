import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import { computed, signal } from '@type-dom/signals';

export class TooltipAdvancedUsageExample extends TypeDiv {
  className = 'TooltipAdvancedUsageExample';
  constructor() {
    super();

    let disabled = signal(false);
    this.addChildren(
      new TdTooltip({
        disabled: disabled,
        content: 'click to close tooltip function',
        placement: 'bottom',
        effect: 'light',
        slot: new TdButton({
          slot: computed(() => `click to ${ disabled.get() ? 'active' : 'close'} tooltip function`),
          events: {
            click: () => disabled.set(!disabled.get()),
          }
        })
      }),
    );
  }
}
