import { I, P, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';

export class MessageBasicExample extends TypeDiv {
  className = 'MessageBasicExample';

  constructor() {
    super();
    const open = () => {
      TdMessage('This is a message.')
    }
    const openVn = () => {
      console.log('click');
      TdMessage({
        message: new P({
          styleObj: {
            lineHeight: 1,
            fontSize: '14px'
          },
          slot: [
            new Span({
              slot: 'Message can be '
            }),
            new I({
              slot: 'VNode',
              styleObj: {
                color: 'teal',
              }
            })
          ]
        }),
        // duration: 0,
      })
    }

    this.addChildren(
      new TdButton({
        slot:'Show message',
        plain: true,
        events: {
          click: open
        }
      }),
      new TdButton({
        slot:'VNode',
        plain: true,
        // styleObj: $btnStyle,
        events: {
          click: openVn,
        }
      }),
    );
  }
}
