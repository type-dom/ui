import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogNestedExample extends TypeDiv {
  className = 'DialogNestedExample';

  constructor() {
    super();
    const outerVisible = signal(false)
    const innerVisible = signal(false)
    this.addChildren(
      new TdButton({
        slot: 'Open the outer Dialog',
        // styleObj: $item,
        events: {
          click: () => {
            outerVisible.set(true)
          }
        }
      }),
      new TdDialog({
        vModel: outerVisible,
        title: 'Outer Dialog',
        width: 800,
        slot: [
          new Span({
            slot: 'This is a message'
          }),
          new TdDialog({
            vModel: innerVisible,
            width: 500,
            title: 'Inner Dialog',
            appendToBody: true,
            slot: new Span({
              slot: 'This is the inner Dialog'
            }),
          })
        ],
        slots: {
          footer: new Div({
            class: 'dialog-footer',
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => {
                    outerVisible.set(false)
                  }
                }
              }),
              new TdButton({
                type: 'primary',
                slot: ' Open the inner Dialog',
                events: {
                  click: () => {
                    console.log('Open the inner Dialog');
                    innerVisible.set(true);
                  }
                }
              })
            ]
          })
        }
      }),
    );
  }
}
