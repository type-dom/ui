import { isBoolean } from '@type-dom/utils';
import { PopoverProps } from './td-popover.interface';

export const popoverProps: PopoverProps = {
  trigger: 'hover',
  placement: 'bottom',
  // visible: undefined,
  tabindex: 9,
  enterable: true,
  effect: 'light',
  teleported: true,
  showAfter: 0,
  hideAfter: 200,
  autoClose: 0,
  showArrow: true,
  persistent: true,
  // 'onUpdate:visible': {
  //   type: Function as PropType<(visible: boolean) => void>,
  // },
};

export const popoverEmits = {
  'update:visible': (value: boolean) => isBoolean(value),
  'before-enter': () => true,
  'before-leave': () => true,
  'after-enter': () => true,
  'after-leave': () => true,
};
