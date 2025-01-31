import { Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopover } from '@type-dom/ui';
import { signal, unref } from '@type-dom/signals';

export class PopoverVirtualTriggerExample extends TypeDiv {
  className = 'PopoverVirtualTriggerExample';
  constructor() {
    super();

    const buttonRef = signal<HTMLElement>()
    const popoverRef = signal<TdPopover>()
    const onClickOutside = () => {
      // unref(popoverRef).popperRef.get()?.delayHide?.()
    }
    const button = new TdButton({
        refId: 'buttonRef',
        slot: 'Click me',
        events: {
          click: () => {
          },
        }
      });
    this.addChildren(
      button,
      new TdPopover({
        refEl: popoverRef,
        // virtualRef: buttonRef,
        trigger: 'click',
        title: 'With Title',
        // virtualTriggering: true,
        slot: new Span({
          slot: ' Some content ',
        })
      }),
    );
  }
}
