import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdSpace } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { genNumArr } from '@type-dom/utils';


export class SpaceLiteralTypeSpacer extends  TypeDiv {
  className = 'SpaceLiteralTypeSpacer';

  setup() {
    const size = signal(10)
    this.addChild(new TdSpace({
      size: size,
      spacer: '|',
      slot: genNumArr(2).map(i => new Div({
        slot: new TdButton({
          slot: 'button ' + i
        })
      }))
    }))
  }
}
