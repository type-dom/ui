import { Div, For, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdSlider, TdSpace } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { genNumArr } from '@type-dom/utils';

export class SpaceCustomizedSize extends TypeDiv {
  className = 'SpaceCustomizedSize';

  setup() {
    const size = signal(20)
    this.addChildren(
      new TdSlider({
        vModel: size,
      }),
      new TdSpace({
        size: size,
        slot: new For({
          data: [1, 2],
          getter: (item, index) => new TdCard({
            class: 'box-card',
            styleObj: {
              width: '250px'
            },
            slot: new For({
              data: [1, 2, 3],
              getter: (i) => new Div({
                class: 'text item',
                slot: `List item ${i}`
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
          }),
        }),
      })
    )
  }
}
