import { UI } from '../../../ui/ui.abstract';
import { TdPopper } from '../td-popper/td-popper.class';
import { ITdTooltip, ITdTooltipConfig } from './td-tooltip.interface';
import { TdTooltipTrigger } from './trigger/trigger.class';
import { TdTooltipContent } from './content/content.class';
import { Span } from '@type-dom/framework';
import { TdPopperArrow } from '../td-popper/arrow/arrow.class';

export class TdTooltip extends UI implements ITdTooltip {
  className : 'TdTooltip';
  private trigger: TdTooltipTrigger;
  private content: TdTooltipContent;

  constructor(config?: ITdTooltipConfig) {
    super();
    this.className = 'TdTooltip';
    this.trigger =  new TdTooltipTrigger();
    this.content =  new TdTooltipContent({
      childNodes: [
        new Span(),
        new TdPopperArrow()
      ]
    });
    this.addChild(
      new TdPopper({
        childNodes: [
          this.trigger,
          this.content
        ]
      }),
    )
    this.setConfig(config);
  }

}
