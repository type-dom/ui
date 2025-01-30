import { Arrayable, isArray, isNumber, isString } from '@type-dom/utils';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { CollapseModelValue } from './td-collapse.interface';

export const emitChangeFn = (value: CollapseModelValue) =>
  isNumber(value) || isString(value) || isArray(value);

export const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn,
};
export type CollapseEmits = typeof collapseEmits;
