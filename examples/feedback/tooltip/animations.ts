import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import './animations.scss';

export class TooltipAnimationsExample extends TypeDiv {
  className = 'TooltipAnimationsExample';
  constructor() {
    super();

    this.addChildren(
      new TdTooltip({
        content: 'I am an el-tooltip',
        transition: 'slide-fade',
        slot: new TdButton({
          slot: `trigger me`,
        })
      }),
    );
  }
}
