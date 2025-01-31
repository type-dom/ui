import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox } from '@type-dom/ui';
import { ElDeleteSvg } from '@type-dom/svgs';

export class MessageBoxCustomizedIconExample extends TypeDiv {
  className = 'MessageBoxCustomizedIconExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.confirm(
        'It will permanently delete the file. Continue?',
        'Warning',
        {
          type: 'warning',
          // icon: markRaw(Delete),
          icon: ElDeleteSvg,
        }
      ).catch(() => {
        TdMessage({
          type: 'info',
          message: 'Cancel',
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
