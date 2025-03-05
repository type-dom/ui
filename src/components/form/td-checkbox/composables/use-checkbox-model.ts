import { getCurrentInstance, inject } from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { isArray, isUndefined } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../../constants/event';
import { CheckboxProps } from '../td-checkbox.interface';
import {
  CheckboxGroupContext,
  checkboxGroupContextKey,
} from '../td-checkbox.const';

export const useCheckboxModel = (props: CheckboxProps) => {
  const selfModel = signal<unknown>(false);
  const { emit } = getCurrentInstance()!;
  const checkboxGroup = inject<CheckboxGroupContext>(
    checkboxGroupContextKey,
    undefined
  );
  // console.log('inject checkGroup is ', checkboxGroup);
  const isGroup = computed(() => isUndefined(checkboxGroup) === false);
  const isLimitExceeded = signal(false);

  const model = computed({
    get() {
      // console.log('get model value isGroup is  ', isGroup.get());
      return isGroup.get()
        ? checkboxGroup?.modelValue?.get()
        : // 这里的computed监听props.modelValue，与vuejs中的监听props.modelValue是不同的，
          // 因为vuejs中的监听props.modelValue，当props.modelValue变化时就会促发。
          // 而这里的computed监听，只有Signal类型的get/set才会触发
          //   所以这里还是用 vModel.get的方式。
          props.vModel?.get() ?? selfModel.get(); // : props.modelValue ?? selfModel.get();
    },
    set(val: unknown) {
      // console.log('set model value is ', val);
      if (isGroup.get() && isArray(val)) {
        isLimitExceeded.set(
          checkboxGroup?.max?.get() !== undefined &&
            val.length > checkboxGroup.max.get()! &&
            val.length > (model.get() as string[]).length
        );
        isLimitExceeded.get() === false && checkboxGroup?.changeEvent?.(val);
      } else {
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.set(val);
      }
    },
  });

  return {
    model,
    isGroup,
    isLimitExceeded,
  };
};

export type CheckboxModel = ReturnType<typeof useCheckboxModel>;
