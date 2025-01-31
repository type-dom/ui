import { Br, TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';

export class TooltipRichContentExample extends TypeDiv {
  className = 'TooltipRichContentExample';
  constructor() {
    super();
    this.addChildren(
      new TdTooltip({
        placement: 'top',
        slot: new TdButton({
          slot: 'Hover me',
        }),
        slots: {
          content: [
            'multiple lines',
            new Br(),
            'second line'
          ],
        }
      }),
    );
  }
}
