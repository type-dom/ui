import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdNotification } from '@type-dom/ui';

export class NotificationPositioningExample extends TypeDiv {
  className = 'NotificationPositioningExample';

  constructor() {
    super();

    const open1 = () => {
      TdNotification({
        title: 'Custom Position',
        message: "I'm at the top right corner",
      })
    }

    const open2 = () => {
      TdNotification({
        title: 'Custom Position',
        message: "I'm at the bottom right corner",
        position: 'bottom-right',
      })
    }

    const open3 = () => {
      TdNotification({
        title: 'Custom Position',
        message: "I'm at the bottom left corner",
        position: 'bottom-left',
      })
    }

    const open4 = () => {
      TdNotification({
        title: 'Custom Position',
        message: "I'm at the top left corner",
        position: 'top-left',
      })
    }
    this.addChildren(
      new TdButton({
        slot: ' Top Right ',
        plain: true,
        events: {
          click: open1
        }
      }),
      new TdButton({
        slot: ' Bottom Right ',
        plain: true,
        events: {
          click: open2
        }
      }),
      new TdButton({
        slot: ' Bottom Left ',
        plain: true,
        events: {
          click: open3
        }
      }),
      new TdButton({
        slot: ' Top Left ',
        plain: true,
        events: {
          click: open4
        }
      }),
    );
  }
}
