import { Div, For, TypeDiv } from '@type-dom/framework';
import { TdButton, TdSpace } from '@type-dom/ui';
import { genNumArr } from '@type-dom/utils';

export class SpaceAutoWrappingExample extends TypeDiv {
  className: 'SpaceAutoWrappingExample';

  constructor() {
    super();
    this.className = 'SpaceAutoWrappingExample';

    this.addChild(
      new TdSpace({
        wrap: true,
        slot: new For({
          data: genNumArr(20),
          getter: () => new Div({
            slot: new TdButton({
              text: true,
              slot: `Text button`
            })
          })
        })
      })
    );
  }
}
