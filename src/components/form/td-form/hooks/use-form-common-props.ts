import { computed, MaybeRef, signal, unref } from '@type-dom/signals';
import { inject } from '@type-dom/framework';
import { ComponentSize } from '../../../../constants/size';
import { useGlobalSize } from '../../../../hooks/use-size';
import { useProp } from '../../../../hooks/use-prop';
import { formContextKey, formItemContextKey } from '../td-form.const';

export const useFormSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = signal(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  const globalConfig = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form
    ? { size: undefined }
    : inject(formContextKey, undefined);
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(formItemContextKey, undefined);

  return computed(
    (): ComponentSize =>
      unref(size) ||
      unref(fallback) ||
      unref(formItem?.size) ||
      form?.size ||
      globalConfig.get() ||
      'default'
  );
};

export const useFormDisabled = (fallback?: MaybeRef<boolean>) => {
  const disabled = useProp<MaybeRef<boolean>>('disabled');
  // console.warn('disabled is ', disabled);
  const form = inject(formContextKey, undefined);
  return computed(
    () => (unref(disabled) || unref(fallback) || unref(form?.disabled) || false) as boolean
  );
};

// These exports are used for preventing breaking changes
export const useSize = useFormSize;
export const useDisabled = useFormDisabled;
