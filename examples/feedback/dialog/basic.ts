import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog, TdMessageBox } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogBasicExample extends TypeDiv {
  className = 'DialogBasicExample';

  constructor() {
    super();

    const dialogVisible = signal(false)

    const handleClose = (done: () => void) => {
      TdMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Click to open the Dialog',
        // styleObj: $item,
        events: {
          click: () => dialogVisible.set(true),
        }
      }),
      new TdDialog({
        title: 'Tips',
        vModel: dialogVisible,
        width: 500,
        beforeClose: handleClose,
        slot: new Span({
          slot: 'This is a message'
        }),
        slots: {
          footer: new Div({
            class: 'dialog-footer',
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
