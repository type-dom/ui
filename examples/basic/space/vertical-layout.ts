import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdSpace } from '@type-dom/ui';
import { genNumArr } from '@type-dom/utils';

export class SpaceVerticalExample extends TypeDiv {
  className: 'SpaceVerticalExample';

  constructor() {
    super();
    this.className = 'SpaceVerticalExample';
    const divs2: Div[] = [];
    for (let i = 0; i < 3; i++) {
      divs2.push(
        new Div({
          slot: `Div2${i}`,
          styleObj: {
            width: '200px',
            height: '200px',
            background: '#ddd'
          }
        })
      );
    }
    this.addChildren(
      new TdSpace({
        wrap: true,
        direction: 'vertical',
        slot: genNumArr(2).map(() => new TdCard({
          class: 'box-card',
          styleObj: {
            width: '250px',
          },
          slot: genNumArr(4).map(o => new Div({
            class: 'text item',
            slot: 'List item ' + o
          })),
          slots: {
            header: new Div({
              class: 'card-header',
              slot: [
                new Span({
                  slot: 'Card name'
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
