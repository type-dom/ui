import { isArray } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { CheckboxValueType } from '../td-checkbox/td-checkbox.interface';
import { ITdCheckboxGroupConfig } from './td-checkbox-group.interface';
import { CheckboxGroupValueType } from './td-checkbox-group.interface';

export const checkboxGroupProps: ITdCheckboxGroupConfig = {
  modelValue: [],
  tag: 'div',
  validateEvent: true,
  // ...useAriaProps(['ariaLabel']),
};

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val),
};

// export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits;
