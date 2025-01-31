import { Div, Span, TypeDiv, For } from '@type-dom/framework';
import { TdButton, TdCard, TdSpace } from '@type-dom/ui';

export class SpaceBasicExample extends TypeDiv {
  className: 'SpaceBasicExample';

  constructor() {
    super();
    this.className = 'SpaceBasicExample';

    this.addChild(
      new TdSpace({
        wrap: true,
        slot: [1, 2, 3].map(() => new TdCard({
            class: 'box-card',
            styleObj: {
              width: '250px',
            },
            slot: new For({
              data: [1, 2, 3, 4],
              getter: (i) => new Div({
                class: 'text item',
                slot: `List item ${ i }`
              }),
            }),
            slots: {
              header: new Div({
                class: 'card-header',
                slot: [
                  new Span({
                    slot: `Card name`
                  }),
                  new TdButton({
                    class: 'button',
                    text: true,
                    slot: 'Operation button'
                  })
                ]
              })
            }
        }))
      })
    );
  }
}
