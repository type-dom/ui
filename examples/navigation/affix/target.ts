import { Div, TypeDiv } from '@type-dom/framework';
import {
  $colors,
  TdAffix,
  TdButton
} from '@type-dom/ui';

export class AffixTargetExample extends TypeDiv {
  className = 'AffixTargetExample';

  constructor() {
    super();
    this.addChild(
      new Div({
        class: 'affix-container',
        styleObj: {
          textAlign: 'center',
          height: '400px',
          borderRadius: '4px',
          // background: var(--el-color-primary-light-9),
          background: $colors.primary['light-9']
        },
        slot: [
          new TdAffix({
            target: '.affix-container',
            offset: 80,
            slot: new TdButton({
              slot: 'Target container',
              type: 'primary'
            })
          })
        ]
      })
    );
  }
}
