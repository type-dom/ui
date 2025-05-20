import { Div, For, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdSpace, TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SpaceFill extends TypeDiv {
  className = 'SpaceFill';

 override  setup() {
    const fill = signal(true)
    this.addChildren(
      new Div({
        styleObj: {
          marginBottom: '15px'
        },
        slot: [
          'fill:',
          new TdSwitch({
            vModel: fill,
          })
        ]
      }),
      new TdSpace({
        fill: fill,
        wrap: true,
        slot: new For({
          data: [1, 2, 3],
          getter: () => new TdCard({
            class: 'box-card',
            slot: new For({
              data: [1, 2, 3, 4],
              getter: (o) => new Div({
                class: 'text item',
                slot: `List item ${ o }`
              })
            })
          })
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
      })
    )
  }
}
