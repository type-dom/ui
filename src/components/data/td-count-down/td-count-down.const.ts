import { isNumber } from '@type-dom/utils';
import { CHANGE_EVENT } from '../../../constants/event';
import { CountDownProps } from './td-count-down.interface';

export const countdownProps: CountDownProps = {
  format: 'HH:mm:ss',
  value: 0,
};

export const countdownEmits = {
  finish: () => true,
  [CHANGE_EVENT]: (value: number) => isNumber(value),
};
