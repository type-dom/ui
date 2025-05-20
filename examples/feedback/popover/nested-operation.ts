import { Div, P, TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopover } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

// todo visible
export class PopoverNestedOperationExample extends TypeDiv {
  className = 'PopoverNestedOperationExample';
  constructor() {
    super();

    const visible = signal(false)
    this.addChildren(
      new TdPopover({
        visible: visible,
        placement: 'top',
        width: 160,
        slot: [
          new P({
            slot: 'Are you sure to delete this?'
          }),
          new Div({
            styleObj: {
              textAlign: 'right',
              margin: 0
            },
            slot: [
              new TdButton({
                size: 'small',
                text: true,
                slot: 'cancel',
                events: {
                  click: () => visible.set(false)
                }
              }),
              new TdButton({
                size: 'small',
                type: 'primary',
                slot: 'confirm',
                events: {
                  click: () => visible.set(false)
                }
              })
            ]
          })
        ],
        slots: {
          reference: new TdButton({
            slot: 'Delete',
            events: {
              click: () => {
                visible.set(true);
              }
            }
          })
        }
      }),
    );
  }
}
