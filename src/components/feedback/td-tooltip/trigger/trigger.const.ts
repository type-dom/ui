import { EVENT_CODE } from '../../../../constants/aria';
import { popperTriggerProps } from '../../td-popper/trigger/trigger.const';
import { TooltipTriggerProps } from './trigger.interface';

export const tooltipTriggerProps: TooltipTriggerProps = {
  ...popperTriggerProps,
  trigger: 'hover',
  triggerKeys: [EVENT_CODE.enter, EVENT_CODE.space],
};
