import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdNotification } from '@type-dom/ui';

export class NotificationDifferentTypesExample extends TypeDiv {
  className = 'NotificationDifferentTypesExample';

  constructor() {
    super();

    const open1 = () => {
      TdNotification({
        title: 'Success',
        message: 'This is a success message',
        type: 'success',
      })
    }

    const open2 = () => {
      TdNotification({
        title: 'Warning',
        message: 'This is a warning message',
        type: 'warning',
      })
    }

    const open3 = () => {
      TdNotification({
        title: 'Info',
        message: 'This is an info message',
        type: 'info',
      })
    }

    const open4 = () => {
      TdNotification({
        title: 'Error',
        message: 'This is an error message',
        type: 'error',
      })
    }

    this.addChildren(
      new TdButton({
        slot: ' Success ',
        plain: true,
        events: {
          click: open1
        }
      }),
      new TdButton({
        slot: ' Warning ',
        plain: true,
        events: {
          click: open2
        }
      }),
      new TdButton({
        slot: ' Info ',
        plain: true,
        events: {
          click: open3
        }
      }),
      new TdButton({
        slot: ' Error ',
        plain: true,
        events: {
          click: open4
        }
      }),
    );
  }
}
