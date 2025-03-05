import { TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton } from '@type-dom/ui';

export class BadgeOffsetExample extends TypeDiv {
  className = 'BadgeOffsetExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdBadge({
        value: 1,
        offset: [10, 5],
        styleObj: $item,
        slot: new TdButton({
          slot: 'offset'
        })
      })
    );
  }
}
