import {
  isArray,
  isBoolean,
  isEqual,
  isObject,
  isPropAbsent,
} from '@type-dom/utils';
import { computed, signal, toRaw } from '@type-dom/signals';
import { inject, ISlots } from '@type-dom/framework';
import { useFormSize } from '../../td-form/hooks/use-form-common-props';
import { CheckboxProps } from '../td-checkbox.interface';
import { checkboxGroupContextKey } from '../td-checkbox.const';
import { CheckboxModel } from './use-checkbox-model';

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ISlots,
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined);
  const isFocused = signal(false);
  const actualValue = computed(() => {
    // In version 2.x, if there's no props.value, props.label will act as props.value
    // In version 3.x, remove this computed value, use props.value instead.
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const isChecked = computed<boolean>(() => {
    const value = model.get();
    if (isBoolean(value)) {
      return value;
    } else if (isArray(value)) {
      // console.warn('isChecked is array . ');
      if (isObject(actualValue.get())) {
        return value.map(toRaw).some((o) => isEqual(o, actualValue.get()));
      } else {
        // console.warn('computed value is ', value, ' toRaw is ', toRaw);
        return value.map(toRaw).includes(actualValue.get());
      }
    } else if (value !== null && value !== undefined) {
      return value === props?.trueValue || value === props?.trueLabel;
    } else {
      return !!value;
    }
  });

  const checkboxButtonSize = useFormSize(checkboxGroup?.size, {
    prop: true,
  });
  const checkboxSize = useFormSize(checkboxGroup?.size);

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isPropAbsent(actualValue.get());
  });

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue,
  };
};

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>;
