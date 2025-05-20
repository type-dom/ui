import { Span, TypeDiv } from '@type-dom/framework';
import { Measurable, TdButton, TdPopover } from '@type-dom/ui';
import { Signal, signal } from '@type-dom/signals';

export class PopoverVirtualTriggerExample extends TypeDiv {
  className = 'PopoverVirtualTriggerExample';
  constructor() {
    super();

    const buttonRef = signal<Measurable>()
    const popoverRef = signal<TdPopover>()

    this.addChildren(
      new TdButton({
        refDom: buttonRef as Signal<HTMLElement>,
        slot: 'Click me',
      }),
      new TdPopover({
        refEl: popoverRef,
        trigger: 'click',
        title: 'With Title',
        virtualRef: buttonRef,
        virtualTriggering: true,
        slot: new Span({
          slot: ' Some content ',
        })
      }),
    );
  }
}
