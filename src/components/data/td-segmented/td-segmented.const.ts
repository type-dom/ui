import { isBoolean, isNumber, isString } from '@type-dom/utils';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { Props, SegmentedProps } from './td-segmented.interface';

export const segmentedProps: SegmentedProps = {
  direction: 'horizontal',
  validateEvent: true,
};

export const segmentedEmits = {
  [UPDATE_MODEL_EVENT]: (val: any) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: any) =>
    isString(val) || isNumber(val) || isBoolean(val),
};

export const defaultProps: Required<Props> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}
