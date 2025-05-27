// import { computed, getCurrentInstance, inject, nextTick, watch } from 'vue'
// import { useFormItem } from '@element-plus/components/form'
// import { debugWarn } from '@element-plus/utils'
// import { checkboxGroupContextKey } from '../constants'
//
// import type { useFormItemInputId } from '@element-plus/components/form'
// import type { CheckboxProps } from '../checkbox'
// import type {
//   CheckboxDisabled,
//   CheckboxModel,
//   CheckboxStatus,
// } from '../composables'

import { getCurrentInstance, inject, nextTick } from '@type-dom/framework';
import { computed, watch } from '@type-dom/signals';
import { debugWarn } from '@type-dom/utils';
import { useFormItem, useFormItemInputId } from '../../td-form/hooks/use-form-item';
import { CHANGE_EVENT } from '../../../../constants/event';
import { checkboxGroupContextKey } from '../td-checkbox.const';
import { CheckboxProps } from '../td-checkbox.interface';
import { CheckboxModel } from './use-checkbox-model';
import { CheckboxStatus } from './use-checkbox-status';
import { CheckboxDisabled } from './use-checkbox-disabled';

export const useCheckboxEvent = (
  props: CheckboxProps,
  {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem,
  }: Pick<CheckboxModel, 'model' | 'isLimitExceeded'> &
    Pick<CheckboxStatus, 'hasOwnLabel'> &
    Pick<CheckboxDisabled, 'isDisabled'> &
    Pick<ReturnType<typeof useFormItemInputId>, 'isLabeledByFormItem'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined);
  const { formItem } = useFormItem();
  const { emit } = getCurrentInstance()!;

  function getLabeledValue(value: string | number | boolean) {
    return [true, props.trueValue, props.trueLabel].includes(value)
      ? props.trueValue ?? props.trueLabel ?? true
      : props.falseValue ?? props.falseLabel ?? false;
  }

  function emitChangeEvent(
    checked: string | number | boolean,
    e?: InputEvent | MouseEvent
  ) {
    // console.warn('emitChangeEvent . checked is ', checked);
    emit(CHANGE_EVENT, getLabeledValue(checked), e);
  }

  function handleChange(e?: Event) {
    // console.warn('handleChange . ');
    if (isLimitExceeded.get()) {
      return;
    }
    if (isDisabled.get()) {
      return;
    } // add by me
    const target = e?.target as HTMLInputElement;
    emit(CHANGE_EVENT, getLabeledValue(target.checked), e);
  }

  async function onClickRoot(e?: MouseEvent) {
    // console.warn('onClickRoot . ');
    // console.warn('onClickRoot . model.get() is ', model.get());
    if (isLimitExceeded.get()) return;

    if (!hasOwnLabel.get() && !isDisabled.get() && isLabeledByFormItem.get()) {
      // fix: https://github.com/element-plus/element-plus/issues/9981
      const eventTargets: EventTarget[] | undefined = e?.composedPath();
      const hasLabel = eventTargets?.some(
        (item) => (item as HTMLElement).tagName === 'LABEL'
      );
      if (!hasLabel) {
        model.set(
          getLabeledValue(
            [false, props.falseValue, props.falseLabel].includes(
              model.get() as string
            )
          )
        );
        await nextTick();
        emitChangeEvent(model.get() as string, e);
      }
    }
  }

  const validateEvent = computed(
    () => checkboxGroup?.validateEvent || props.validateEvent
  );

  watch(
    () => props.vModel?.get(),
    () => {
      if (validateEvent.get()) {
        formItem?.validate('change').catch((err) => debugWarn(err));
      }
    }
  );

  return {
    handleChange,
    onClickRoot,
  };
};
