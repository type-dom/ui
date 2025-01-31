import { Div, Span, TypeDiv } from '@type-dom/framework';
import { $dialogFooterStyle, TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogCenteredContentExample extends TypeDiv {
  className = 'DialogCenteredContentExample';

  constructor() {
    super();

    const centerDialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Click to open the Dialog',
        events: {
          click: (evt, element) =>
            centerDialogVisible.set(true)
        }
      }),
      new TdDialog({
        title: 'Warning',
        vModel: centerDialogVisible,
        center: true,
        width: 500,
        slot: [
          new Span({
            slot: 'It should be noted that the content will not be aligned in center by default'
          }),
        ],
        slots: {
          footer: new Div({
            class: "dialog-footer",
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => centerDialogVisible.set(false)
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
