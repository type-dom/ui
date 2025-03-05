import { isArray, isPropAbsent } from '@type-dom/utils';
import { ISlots } from '@type-dom/framework';
import {
  useFormItem,
  useFormItemInputId,
} from '../../td-form/hooks/use-form-item';
import { CheckboxProps } from '../td-checkbox.interface';
import { useCheckboxStatus } from './use-checkbox-status';
import { useCheckboxModel } from './use-checkbox-model';
import { useCheckboxDisabled } from './use-checkbox-disabled';
import { useCheckboxEvent } from './use-checkbox-event';
import { useDeprecated } from '../../../../hooks/use-deprecated';
import { computed } from '@type-dom/signals';

export const useCheckbox = (props: CheckboxProps, slots: ISlots = {}) => {
  const { formItem: elFormItem } = useFormItem();
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props);
  // console.log(
  //   'isGroup is ',
  //   isGroup.get(),
  //   ' isLimitExceeded is ',
  //   isLimitExceeded.get()
  // );
  const {
    isFocused,
    isChecked,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    actualValue,
  } = useCheckboxStatus(props, slots, { model });
  const { isDisabled } = useCheckboxDisabled({ model, isChecked });
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: elFormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup,
  });
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
  });

  const setStoreValue = () => {
    function addToStore() {
      if (
        isArray(model.get()) &&
        !(model.get() as any[]).includes(actualValue.get())
      ) {
        (model.get() as any[]).push(actualValue.get());
      } else {
        model.set(props.trueValue ?? props.trueLabel ?? true);
      }
    }

    props.checked && addToStore();
  };

  setStoreValue();

  useDeprecated(
    {
      from: 'label act as value',
      replacement: 'value',
      version: '3.0.0',
      scope: 'el-checkbox',
      ref: 'https://element-plus.org/en-US/component/checkbox.html',
    },
    computed(() => isGroup.get() && isPropAbsent(props.value))
  );

  useDeprecated(
    {
      from: 'true-label',
      replacement: 'true-value',
      version: '3.0.0',
      scope: 'el-checkbox',
      ref: 'https://element-plus.org/en-US/component/checkbox.html',
    },
    computed(() => !!props.trueLabel)
  );

  useDeprecated(
    {
      from: 'false-label',
      replacement: 'false-value',
      version: '3.0.0',
      scope: 'el-checkbox',
      ref: 'https://element-plus.org/en-US/component/checkbox.html',
    },
    computed(() => !!props.falseLabel)
  );

  return {
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isFocused,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    model,
    actualValue,
    handleChange,
    onClickRoot,
  };
};
