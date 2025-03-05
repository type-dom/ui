import { isBoolean, isNumber, isString } from '@type-dom/utils';
import { InjectionKey } from '@type-dom/framework';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { SelectContext } from '../td-select/td-select.interface';
import { SwitchProps } from './td-switch.interface';

export const switchProps: SwitchProps = {
  modelValue: false,
  width: '',
  activeText: '',
  inactiveText: '',
  activeValue: true,
  inactiveValue: false,
  name: '',
  validateEvent: true,
};
// 这些只是验证器，与双向绑定没有任何关系的。
export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) => {
    // console.log('switch emit update:modelValue . ');
    return isBoolean(val) || isString(val) || isNumber(val);
  },
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
};

export const switchKey: InjectionKey<SelectContext> = Symbol('TdSwitch');
