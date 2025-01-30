// import { unref } from 'vue'
// import { isArray } from '@element-plus/utils'
// import type { Arrayable } from '@element-plus/utils'
// import type { Ref } from 'vue'
import { isArray } from '@type-dom/utils';
import { Arrayable } from '../../../../../utils/src/ui/typescript';
import type { TooltipTriggerType } from './trigger/trigger.interface';

export const isTriggerType = (
  trigger: Arrayable<TooltipTriggerType>,
  type: TooltipTriggerType
) => {
  if (isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
};

export const whenTrigger = (
  // trigger: Ref<Arrayable<TooltipTriggerType>>,
  trigger: Arrayable<TooltipTriggerType>,
  type: TooltipTriggerType,
  handler: (e: Event) => void
) => {
  return (e: Event) => {
    console.log('whenTrigger', trigger, type, e);
    isTriggerType(trigger, type) && handler(e);
  };
};
