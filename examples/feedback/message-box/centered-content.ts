import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox } from '@type-dom/ui';

export class MessageBoxCenteredContentExample extends TypeDiv {
  className = 'MessageBoxCenteredContentExample';

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
          center: true,
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
        slot: 'Click to open the Message Box',
        plain: true,
        events: {
          click: open,
        },
      })
    );
  }
}
