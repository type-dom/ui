import { isPropAbsent } from '@type-dom/utils';
import { ITdCheckboxConfig } from '../td-checkbox.interface';

export const useCheckboxStatus = (
  props?: ITdCheckboxConfig
) => {
  // const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = false;
  const actualValue = (() => {
    // In version 2.x, if there's no props.value, props.label will act as props.value
    // In version 3.x, remove this computed value, use props.value instead.
    if (!isPropAbsent(props?.value)) {
      return props?.value
    }
    return props?.label
  })();
  // const isChecked = computed<boolean>(() => {
  //   const value = model.value
  //   if (isBoolean(value)) {
  //     return value
  //   } else if (isArray(value)) {
  //     if (isObject(actualValue.value)) {
  //       return value.map(toRaw).some((o) => isEqual(o, actualValue.value))
  //     } else {
  //       return value.map(toRaw).includes(actualValue.value)
  //     }
  //   } else if (value !== null && value !== undefined) {
  //     return value === props.trueValue || value === props.trueLabel
  //   } else {
  //     return !!value
  //   }
  // })
  //
  // const checkboxButtonSize = useFormSize(
  //   computed(() => checkboxGroup?.size?.value),
  //   {
  //     prop: true,
  //   }
  // )
  // const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))
  //
  const hasOwnLabel =  !!props?.slot || !isPropAbsent(actualValue);

  return {
    // checkboxButtonSize,
    // isChecked,
    isFocused,
    // checkboxSize,
    hasOwnLabel,
    actualValue,
  }
}

// export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
