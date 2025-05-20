import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class MessageDifferentTypesExample extends TypeDiv {
  className = 'MessageDifferentTypesExample';

  constructor() {
    super();
    const $itemStyle: IStyle = {
      marginLeft: '20px',
    };
    const open1 = () => {
      TdMessage('This is a message.')
    }
    const open2 = () => {
      TdMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
      })
    }
    const open3 = () => {
      TdMessage({
        message: 'Warning, this is a warning message.',
        type: 'warning',
      })
    }
    const open4 = () => {
      TdMessage.error('Oops, this is a error message.')
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
        styleObj: $itemStyle,
        events: {
          click: open4
        }
      }),
    );
  }
}
