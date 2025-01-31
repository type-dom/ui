import { Div, Span, Strong, TypeDiv } from '@type-dom/framework';
import { $dialogFooterStyle, TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogDestroyOnCloseExample extends TypeDiv {
  className = 'DialogDestroyOnCloseExample';

  constructor() {
    super();
    const centerDialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Click to open Dialog',
        // styleObj: $item,
        events: {
          click: () =>
            centerDialogVisible.set(true)
        }
      }),
      new TdDialog({
        title: 'Notice',
        vModel: centerDialogVisible,
        width: 500,
        destroyOnClose: true,
        center: true,
        slot: [
          new Span({
            slot: 'Notice: before dialog gets opened for the first time this node and the one\n' +
              '      bellow will not be rendered'
          }),
          new Div({
            slot: new Strong({
              slot: 'Extra content (Not rendered)'
            })
          })
        ],
        slots: {
          footer: new Div({
            class: "dialog-footer",
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => {
                    centerDialogVisible.set(false)
                  }
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: (evt, element) => {
                    centerDialogVisible.set(false)
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
