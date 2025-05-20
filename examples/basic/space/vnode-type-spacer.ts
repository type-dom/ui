import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDivider, TdSpace } from '@type-dom/ui';
import { genNumArr } from '@type-dom/utils';
import { signal } from '@type-dom/signals';

export class SpaceNodeTypeSpacer extends TypeDiv {
  className = 'SpaceNodeTypeSpacer';

 override  setup() {
    const size = signal(10)
    const spacer = new TdDivider({ direction: 'vertical' })
    this.addChild(new TdSpace({
      size,
      spacer,
      slot: genNumArr(2).map(i => new Div({
        slot: new TdButton({
          slot: 'button ' + i
        })
      })),
    }))
  }
}
