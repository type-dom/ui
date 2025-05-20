import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogModalExample extends TypeDiv {
  className = 'DialogModalExample';

  constructor() {
    super();

    const dialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Open the modal Dialog',
        events: {
          click: () => dialogVisible.set(true),
        }
      }),
      new TdDialog({
        vModel: dialogVisible,
        modal: false,
        slot: new Span({
          slot: 'It\'s a modal Dialog'
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
