import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdTooltip extends IUI {
  className: 'TdTooltip'
}

export interface ITdTooltipConfig extends IUIConfig {
  // ...popperProps,
  // ...useTooltipModelToggleProps,
  // ...useTooltipContentProps,
  // ...useTooltipTriggerProps,
  // ...popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow?: boolean, // default: true,
}
