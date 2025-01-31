import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';

export class MessageClosableExample extends TypeDiv {
  className = 'MessageClosableExample';

  constructor() {
    super();

    const open1 = () => {
      TdMessage({
        showClose: true,
        message: 'This is a message.',
      })
    }
    const open2 = () => {
      TdMessage({
        showClose: true,
        message: 'Congrats, this is a success message.',
        type: 'success',
      })
    }
    const open3 = () => {
      TdMessage({
        showClose: true,
        message: 'Warning, this is a warning message.',
        type: 'warning',
      })
    }
    const open4 = () => {
      TdMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error',
      })
    }

    this.addChildren(
      new TdButton({
        slot:'Message',
        plain: true,
        events: {
          click: open1
        }
      }),
      new TdButton({
        slot:'Success',
        plain: true,
        events: {
          click: open2
        }
      }),
      new TdButton({
        slot:'Warning',
        plain: true,
        events: {
          click: open3
        }
      }),
      new TdButton({
        slot:'Error',
        plain: true,
        events: {
          click: open4
        }
      }),
    );
  }
}
