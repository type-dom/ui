import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdNotification } from '@type-dom/ui';

export class NotificationOffsettingExample extends TypeDiv {
  className = 'NotificationOffsettingExample';

  constructor() {
    super();

    const open = () => {
      TdNotification.success({
        title: 'Success',
        message: 'This is a success message',
        offset: 100,
      })
    }
    this.addChildren(
      new TdButton({
        slot: ' Notification with offset ',
        plain: true,
        events: {
          click: open
        }
      }),
    );
  }
}
