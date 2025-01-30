import { isBoolean, isNumber, isString } from '@type-dom/utils';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean | undefined) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean | undefined) =>
    isString(val) || isNumber(val) || isBoolean(val),
};
