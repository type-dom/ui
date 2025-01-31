import { TypeDiv } from '@type-dom/framework';
import {
  TdAffix,
  TdButton
} from '@type-dom/ui';

export class AffixFixedPositionExample extends TypeDiv {
  className = 'AffixFixedPositionExample';

  constructor() {
    super();
    this.addChild(
      new TdAffix({
        name: 'td-affix',
        offset: 20,
        position: 'bottom',
        slot: new TdButton({
          slot: 'Offset bottom 20px',
          type: 'primary'
        })
      })
    );
  }
}
