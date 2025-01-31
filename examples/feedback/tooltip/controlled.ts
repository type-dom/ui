import { TypeDiv, Span } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

// todo 不显示
export class TooltipControlledExample extends TypeDiv {
  className = 'TooltipControlledExample';
  constructor() {
    super();
    const visible = signal(false);
    this.addChildren(
      new TdTooltip({
        visible: visible,
        placement: 'bottom',
        effect: 'light',
        slot: new TdButton({
          slot: 'Hover me',
          events: {
            mouseenter: () => {
              console.log('controlled mouseenter ');
              visible.set(true);
            },
            mouseleave: (evt, element) => {
              visible.set(false);
            }
          }
        }),
        slots: {
          content: new Span({
            slot: 'Content',
          })
        }
      }),
    );
  }
}
