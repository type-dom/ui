import { TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton } from '@type-dom/ui';

export class BadgeBasicExample extends TypeDiv {
  className = 'BadgeBasicExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdBadge({
        value: 12,
        styleObj: $item,
        slot: new TdButton({
          slot: 'comments'
        })
      }),
      new TdBadge({
        value: 3,
        styleObj: $item,
        slot: new TdButton({
          slot: 'replies'
        })
      }),
      new TdBadge({
        value: 1,
        type: 'primary',
        styleObj: $item,
        slot: new TdButton({
          slot: 'comments'
        })
      }),
      new TdBadge({
        value: 2,
        type: 'warning',
        styleObj: $item,
        slot: new TdButton({
          slot: 'replies'
        })
      }),
      new TdBadge({
        value: 1,
        color: 'green',
        styleObj: $item,
        slot: new TdButton({
          slot: 'custom background'
        })
      })
    );
  }
}
