import { I, TypeDiv } from '@type-dom/framework';
import { TdButton, TdNotification } from '@type-dom/ui';

export class NotificationBasicExample extends TypeDiv {
  className = 'NotificationBasicExample';

  constructor() {
    super();

    const open1 = () => {
      console.log('click');
      TdNotification({
        title: 'Title',
        // message: h('i', { style: 'color: teal' }, 'This is a reminder'),
        message: new I({
          slot: 'This is a reminder',
          styleObj: {
            color: 'teal'
          }
        })
      })
    }
    const open2 = () => {
      console.log('click');
      TdNotification({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0,
      })
    }
      this.addChildren(
      new TdButton({
        slot: ' Closes automatically ',
        plain: true,
        events: {
          click: open1,
        }
      }),
      new TdButton({
        slot: ' Won\'t close automatically ',
        plain: true,
        events: {
          click: open2
        }
      }),
    );
  }
}
