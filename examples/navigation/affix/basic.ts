import { TypeDiv } from '@type-dom/framework';
import {
  TdAffix,
  TdButton
} from '@type-dom/ui';

export class AffixBasicExample extends TypeDiv {
  className = 'AffixBasicExample';

  constructor() {
    super();
    this.addChild(
      new TdAffix({
        name: 'td-affix',
        offset: 120,
        slot: new TdButton({
          slot: 'Offset top 120px',
          type: 'primary'
        })
      })
    );
  }
}
