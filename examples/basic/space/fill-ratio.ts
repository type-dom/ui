import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdRadio, TdSlider, TdSpace } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { genNumArr } from '@type-dom/utils';

export class SpaceFillRatio extends TypeDiv {
  className = 'SpaceFillRatio';

 override  setup() {
    const direction = signal<'horizontal' | 'vertical'>('horizontal')
    const fillRatio = signal(30)
    this.addChildren(
      new Div({
        styleObj: {
         marginBottom: '15px'
        },
        slot: [
          'direction:',
          new TdRadio({
            vModel: direction,
            value: 'horizontal',
            slot: 'horizontal,'
          }),
          new TdRadio({
            vModel: direction,
            value: 'vertical',
            slot: 'vertical'
          })
        ]
      }),
      new Div({
        styleObj: {
          marginBottom: '15px'
        },
        slot: [
          'fillRatio',
          new TdSlider({
            vModel: fillRatio,
          })
        ]
      }),
      new TdSpace({
        fill: true,
        wrap: true,
        fillRatio: fillRatio,
        direction: direction,
        styleObj: {
          width: '100%',
        },
        slot: genNumArr(5).map(() => new TdCard({
          class: 'box-card',
          slot: genNumArr(4).map(o => new Div({
            class: 'text item',
            slot: `List item ${o}`
          })),
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
    )
  }
}
