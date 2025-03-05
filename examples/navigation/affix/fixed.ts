import { TypeDiv } from '@type-dom/framework';
import {
  TdAffix,
  TdButton
} from '@type-dom/ui';

export class AffixFixedExample extends TypeDiv {
  className = 'AffixFixedExample';

  constructor() {
    super();
    this.addChild(
      new TdAffix({
        name: 'td-affix',
        position: 'bottom',
        offset: 20,
        slot: new TdButton({
          slot: 'Offset bottom 20px',
          type: 'primary'
        })
      })
    );
  }
}
