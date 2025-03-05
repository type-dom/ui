import { isNil, isNumber } from '@type-dom/utils';
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { InputNumberProps } from './td-input-number.interface';

export const inputNumberProps: InputNumberProps = {
  step: 1,
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  controls: true,
  controlsPosition: '',
  valueOnClear: null,
  validateEvent: true,
  // ...useAriaProps(['ariaLabel']),
}

export const inputNumberEmits = {
  [CHANGE_EVENT]: (cur: number | undefined, prev: number | undefined) =>
    prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined) =>
    isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined) =>
    isNumber(val) || isNil(val),
}
