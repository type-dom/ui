import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogAlignCenterExample extends TypeDiv {
  className = 'DialogAlignCenterExample';

  constructor() {
    super();
    const centerDialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        slot: 'Click to open the Dialog',
        events: {
          click: () =>
            centerDialogVisible.set(true)
        }
      }),
      new TdDialog({
        vModel: centerDialogVisible,
        title: 'Warning',
        width: 500,
        alignCenter: true,
        slot: new Span({
          slot: 'Open the dialog from the center from the screen'
        }),
        slots: {
          footer: new Div({
            class: "dialog-footer",
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () =>
                    centerDialogVisible.set(false)
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: () => centerDialogVisible.set(false)
                }
              })
            ]
          })
        }
      }),
    );
  }
}
