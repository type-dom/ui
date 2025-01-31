import { TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton } from '@type-dom/ui';

export class BadgeMaxExample extends TypeDiv {
  className = 'BadgeMaxExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdBadge({
        value: 200,
        max: 99,
        styleObj: $item,
        slot: new TdButton({
          slot: 'comments'
        })
      }),
      new TdBadge({
        value: 100,
        max: 10,
        styleObj: $item,
        slot: new TdButton({
          slot: 'replies'
        })
      })
    );
  }
}
