import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopconfirm } from '@type-dom/ui';

export class PopconfirmBasicUsageExample extends TypeDiv {
  className = 'PopconfirmBasicUsageExample';

  constructor() {
    super();

    this.addChildren(
      new TdPopconfirm({
        title: 'Are you sure to delete this?',
        slots: {
          reference: new TdButton({
            slot: 'Delete',
          })
        }
      }),
    );
  }
}
