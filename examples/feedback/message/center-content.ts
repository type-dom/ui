import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';

export class MessageCenterContentExample extends TypeDiv {
  className = 'MessageCenterContentExample';

  constructor() {
    super();

    const openCenter = () => {
      TdMessage({
        showClose: true,
        message: 'Centered Text',
        center: true
      });
    }
    this.addChild(
      new TdButton({
        slot:'Centered text',
        plain: true,
        events: {
          click: openCenter
        }
      })
    );
  }
}
