import { InjectionKey } from '@type-dom/framework';
import { ToRefs } from '@type-dom/signals';
import { isBoolean, isNumber, isString } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import type { ITdCheckboxGroupConfig } from '../td-checkbox-group/td-checkbox-group.interface';
import { CheckboxValueType, CheckboxProps } from './td-checkbox.interface';

export type CheckboxGroupContext = {
  modelValue?: any;
  changeEvent?: (...args: any) => any;
} & ToRefs<
  Pick<
    ITdCheckboxGroupConfig,
    'size' | 'min' | 'max' | 'disabled' | 'validateEvent' | 'fill' | 'textColor'
  >
>;

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContextKey');

export const checkboxProps: CheckboxProps = {
  validateEvent: true,
};

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
};
