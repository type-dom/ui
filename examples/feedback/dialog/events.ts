import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog, TdMessageBox } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogEventsExample extends TypeDiv {
  className = 'DialogEventsExample';

  constructor() {
    super();
    const dialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Open the event Dialog',
        events: {
          click: () => dialogVisible.set(true),
        }
      }),
      new TdDialog({
        vModel: dialogVisible,
        width: 500,
        beforeClose: (doneFn) => {
          console.log('before-close');
          doneFn()
        },
        emits: {
          open: () => console.log('open'),
          openAutoFocus: () => console.log('open-auto-focus'),
          opened: () => console.log('opened'),
          close: () => console.log('close'),
          closeAutoFocus: () => console.log('close-auto-focus'),
          closed: () => console.log('closed'),
        },
        slot: new Span({
          slot: 'It\'s a event Dialog'
        }),
        slots: {
          footer: new Div({
            class: "dialog-footer",
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => dialogVisible.set(false)
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: () => dialogVisible.set(false)
                }
              })
            ]
          })
        }
      }),
    );
  }
}
