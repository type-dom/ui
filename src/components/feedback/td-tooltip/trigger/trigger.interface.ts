import { IUI } from '../../../../ui/ui.interface';
import { ITdPopperTriggerConfig } from '../../td-popper/trigger/trigger.interface';

export interface ITdTooltipTrigger extends IUI {
  className: 'TdTooltipTrigger';
}

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu';

export interface ITdTooltipTriggerConfig extends ITdPopperTriggerConfig {
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: boolean;
  /**
   * @description How should the tooltip be triggered (to show)
   */
  trigger?: TooltipTriggerType;
  // trigger: {
  //   type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
  //   default: 'hover',
  // },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard
   *     default: () => [EVENT_CODE.enter, EVENT_CODE.space],
   */
  triggerKeys?: string[],
}
