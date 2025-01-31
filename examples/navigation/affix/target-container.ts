import { Div, TypeDiv } from '@type-dom/framework';
import {
  $colors,
  TdAffix,
  TdButton
} from '@type-dom/ui';

export class AffixTargetContainerExample extends TypeDiv {
  className = 'AffixTargetContainerExample';

  constructor() {
    super();
    this.addChild(
      new Div({
        styleObj: {
          textAlign: 'center',
          height: '400px',
          borderRadius: '4px',
          // background: var(--el-color-primary-light-9),
          background: $colors.primary['light-9']
        },
        slot: [
          new TdAffix({
            name: 'td-affix',
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
