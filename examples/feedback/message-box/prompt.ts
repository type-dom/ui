import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class MessageBoxPromptExample extends TypeDiv {
  className = 'MessageBoxPromptExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.prompt('Please input your e-mail', 'Tip', {
        confirmButtonText: signal('OK'),
        cancelButtonText: signal('Cancel'),
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'Invalid Email',
      })
        .then(({ value }) => {
          // const value = input.props.vModel.get();
          TdMessage({
            type: 'success',
            message: `Your email is:${value}`,
          });
        })
        .catch(() => {
          TdMessage({
            type: 'info',
            message: 'Input canceled',
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
