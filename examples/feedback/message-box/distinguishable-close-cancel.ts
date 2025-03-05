import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox, Action } from '@type-dom/ui';

export class MessageBoxDistinguishableCloseCenterExample extends TypeDiv {
  className = 'MessageBoxDistinguishableCloseCenterExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.confirm(
        'You have unsaved changes, save and proceed?',
        'Confirm',
        {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Save',
          cancelButtonText: 'Discard Changes',
        }
      )
        .then(() => {
          TdMessage({
            type: 'info',
            message: 'Changes saved. Proceeding to a new route.',
          });
        })
        .catch((action: Action) => {
          TdMessage({
            type: 'info',
            message:
              action === 'cancel'
                ? 'Changes discarded. Proceeding to a new route.'
                : 'Stay in the current route',
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
