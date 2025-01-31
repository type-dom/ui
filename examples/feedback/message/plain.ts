import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class MessagePlainExample extends TypeDiv {
  className = 'MessagePlainExample';

  constructor() {
    super();
    const $itemStyle: IStyle = {
      marginLeft: '20px',
    };

    const open1 = () => {
      TdMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
        plain: true,
      })
    }
    const open2 = () => {
      TdMessage({
        message: 'Warning, this is a warning message.',
        type: 'warning',
        plain: true,
      })
    }
    const open3 = () => {
      TdMessage({
        message: 'This is a message.',
        type: 'info',
        plain: true,
      })
    }
    const open4 = () => {
      TdMessage({
        message: 'Oops, this is a error message.',
        type: 'error',
        plain: true,
      })
    }

    this.addChildren(
      new TdButton({
        slot:'Success',
        plain: true,
        events: {
          click: open1
        }
      }),
      new TdButton({
        slot:'Warning',
        plain: true,
        events: {
          click: open2
        }
      }),
      new TdButton({
        slot:'Message',
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
