import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';

export class TooltipHtmlContentExample extends TypeDiv {
  className = 'TooltipHtmlContentExample';
  constructor() {
    super();
    this.addChildren(
      new TdTooltip({
        content: '<span>The content can be <strong>HTML</strong></span>',
        rawContent: true,
        slot: new TdButton({
          slot: 'Hover me',
        }),
      }),
    );
  }
}
