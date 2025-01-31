import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';

export class MessageGroupingExample extends TypeDiv {
  className = 'MessageGroupingExample';

  constructor() {
    super();
    const open = () => {
      TdMessage({
        message: 'This is a message.',
        grouping: true,
        type: 'success',
        // duration: 0,
      })
    }

    this.addChild(
      new TdButton({
        slot:'Show message',
        plain: true,
        events: {
          click: open,
        }
      }),
    );
  }
}
