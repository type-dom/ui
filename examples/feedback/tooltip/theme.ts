import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import './theme.scss';

export class TooltipThemeExample extends TypeDiv {
  className = 'TooltipThemeExample';
  constructor() {
    super();

    this.addChildren(
      new TdTooltip({
        content: 'Top center',
        placement: 'top',
        slot: new TdButton({
          slot: 'Dark'
        })
      }),
      new TdTooltip({
        effect: 'light',
        content: 'Bottom center',
        placement: 'bottom',
        slot: new TdButton({
          slot: 'Light',
        })
      }),
      new TdTooltip({
        content: 'Bottom center',
        effect: 'customized',
        slot: new TdButton({
          slot: 'Customized theme',
        })
      })
    );
  }
}
