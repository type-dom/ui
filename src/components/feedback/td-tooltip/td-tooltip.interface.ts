import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ITdPopperConfig } from '../td-popper/td-popper.interface';
import { ITdTooltipTriggerConfig } from './trigger/trigger.interface';
import { ITdPopperArrowConfig } from '../td-popper/arrow/arrow.interface';
import { ITdTooltipContentConfig } from './content/content.interface';

export interface ITdTooltip extends IUI {
  className: 'TdTooltip';
}

export interface ITdTooltipConfig extends ITdPopperConfig, ITdTooltipContentConfig, ITdTooltipTriggerConfig, ITdPopperArrowConfig {
  // ...popperProps,
  // ...useTooltipModelToggleProps,
  // ...useTooltipContentProps,
  // ...useTooltipTriggerProps,
  // ...popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow?: boolean; // default: true,
}
