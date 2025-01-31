import { TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton } from '@type-dom/ui';
import { ElShareSvg } from '@type-dom/svgs';

export class BadgeDotExample extends TypeDiv {
  className = 'BadgeDotExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdBadge({
        isDot: true,
        styleObj: $item,
        slot: new TdButton({
          slot: 'query'
        })
      }),
      new TdBadge({
        isDot: true,
        styleObj: $item,
        slot: new TdButton({
          type: 'primary',
          icon: new ElShareSvg()
        })
      })
    );
  }
}
