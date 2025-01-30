import { inject } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { isUndefined } from '@type-dom/utils';
import { useFormDisabled } from '../../td-form/hooks/use-form-common-props';
import { checkboxGroupContextKey } from '../td-checkbox.const';
import { CheckboxStatus } from './use-checkbox-status';
import { CheckboxModel } from './use-checkbox-model';

export const useCheckboxDisabled = ({
  model,
  isChecked,
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'>) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined);

  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.max?.get();
    const min = checkboxGroup?.min?.get();
    return (
      (!isUndefined(max) &&
        (model.get() as any[])?.length >= max &&
        !isChecked.get()) ||
      (!isUndefined(min) &&
        (model.get() as any[])?.length <= min &&
        isChecked.get())
    );
  });

  const isDisabled = useFormDisabled(
    computed(() => checkboxGroup?.disabled?.get() || isLimitDisabled.get())
  );

  return {
    isDisabled,
    isLimitDisabled,
  };
};

export type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>;
