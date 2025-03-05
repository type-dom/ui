import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox } from '@type-dom/ui';

export class MessageBoxDraggableExample extends TypeDiv {
  className = 'MessageBoxDraggableExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          draggable: true,
        }
      )
        .then(() => {
          TdMessage({
            type: 'success',
            message: 'Delete completed',
          });
        })
        .catch(() => {
          TdMessage({
            type: 'info',
            message: 'Delete canceled',
          });
        });
    };

    const open2 = () => {
      TdMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
          draggable: true,
          overflow: true,
        }
      )
        .then(() => {
          TdMessage({
            type: 'success',
            message: 'Delete completed',
          });
        })
        .catch(() => {
          TdMessage({
            type: 'info',
            message: 'Delete canceled',
          });
        });
    };
    this.addChildren(
      new TdButton({
        slot: 'Open a draggable Message Box',
        plain: true,
        events: {
          click: open,
        },
      }),
      new TdButton({
        slot: 'Open a overflow draggable Message Box',
        plain: true,
        events: {
          click: open2,
        },
      })
    );
  }
}
