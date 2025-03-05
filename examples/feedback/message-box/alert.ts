import { TypeDiv } from '@type-dom/framework';
import { Action, TdButton, TdMessageBox, TdMessage } from '@type-dom/ui';

export class MessageBoxAlertExample extends TypeDiv {
  className = 'MessageBoxAlertExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.alert('This is a message', 'Title', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          TdMessage({
            type: 'info',
            message: `action: ${action}`,
          });
        },
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
