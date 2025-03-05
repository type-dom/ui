import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdDivider, TdSpace } from '@type-dom/ui';
import { genNumArr } from '@type-dom/utils';
import { signal } from '@type-dom/signals';

export class SpaceNodeTypeSpacer extends TypeDiv {
  className = 'SpaceNodeTypeSpacer';

  setup() {
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
