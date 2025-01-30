import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { PopperTriggerProps } from '../../td-popper/trigger/trigger.interface';
import { MaybeRef } from '@type-dom/signals';

export interface ITdTooltipTrigger extends ITypeFragment {
  className: 'TdTooltipTrigger';
}

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu';

export interface TooltipTriggerProps extends PopperTriggerProps {
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: MaybeRef<boolean>;
  /**
   * @description How should the tooltip be triggered (to show)
   */
  trigger?: TooltipTriggerType | TooltipTriggerType[];
  // trigger: {
  //   type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
  //   default: 'hover',
  // },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard
   *     default: () => [EVENT_CODE.enter, EVENT_CODE.space],
   */
  triggerKeys?: string[];
}
