import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdEmpty } from '@type-dom/ui';

export class EmptyBottomContentExample extends TypeDiv {
  className = 'EmptyBottomContentExample';

  constructor() {
    super();
    this.addChildren(
      new TdEmpty({
        slot: new TdButton({
          type: 'primary',
          slot: 'Button',
        })
      }),
    );
  }
}
