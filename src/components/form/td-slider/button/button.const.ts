import { isNumber } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../../constants/event';

export const sliderButtonProps = {
  modelValue: 0,
  placement: 'top',
} as const;

export const sliderButtonEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
};
