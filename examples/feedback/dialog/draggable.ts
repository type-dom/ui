import { Div, Span, TypeDiv } from '@type-dom/framework';
import { $dialogFooterStyle, TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogDraggableExample extends TypeDiv {
  className = 'DialogDraggableExample';

  constructor() {
    super();
    const dialogVisible = signal(false)
    const dialogOverflowVisible = signal(false)

    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Open a draggable Dialog',
        events: {
          click: (evt, element) => {
            dialogVisible.set(true);
          }
        }
      }),
      new TdButton({
        plain: true,
        slot: 'Open a overflow draggable Dialog',
        events: {
          click: (evt, element) => {
            dialogOverflowVisible.set(true)
          }
        }
      }),
      new TdDialog({
        vModel: dialogVisible,
        title: 'Tips',
        width: 500,
        draggable: true,
        slot: new Span({
          slot: 'It\'s a draggable Dialog'
        }),
        slots: {
          footer: new Div({
            class: 'dialog-footer',
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: (evt, element) => {
                    dialogVisible.set(false);
                  }
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: (evt, element) => {
                    dialogVisible.set(false);
                  }
                }
              })
            ]
          })
        }
      }),
      new TdDialog({
        vModel: dialogOverflowVisible,
        title: 'Tips',
        width: 500,
        draggable: true,
        overflow: true,
        slot: new Span({
          slot: 'It\'s a overflow draggable Dialog'
        }),
        slots: {
          footer: new Div({
            class: 'dialog-footer',
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: (evt, element) => {
                    dialogOverflowVisible.set(false);
                  }
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: (evt, element) => {
                    dialogOverflowVisible.set(false);
                  }
                }
              })
            ]
          })
        }
      }),

    );
  }
}
