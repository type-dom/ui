import {
  Signal,
  Computed,
  signal,
  computed,
  watch,
  Effect,
  toRef,
  WatchStopHandle,
  unref,
  Ref,
} from '@type-dom/signals';
import { inject, onMounted, onUnmounted } from '@type-dom/framework';
import { formContextKey, formItemContextKey } from '../td-form.const';
import { FormContext, FormItemContext } from '../td-form.interface';
import { useId } from '../../../../hooks/use-id';

export const useFormItem = () => {
  const form = inject<FormContext>(formContextKey, undefined);
  const formItem = inject<FormItemContext>(formItemContextKey, undefined);
  return {
    form,
    formItem,
  };
};

export type IUseFormItemInputCommonProps = {
  id?: string;
  label?: string | number | boolean | Record<string, any>;
  ariaLabel?: string | number | boolean | Record<string, any>;
};

export const useFormItemInputId = (
  props: Partial<IUseFormItemInputCommonProps>,
  {
    formItemContext,
    disableIdGeneration,
    disableIdManagement,
  }: {
    formItemContext?: FormItemContext;
    disableIdGeneration?: Computed | Signal<string | boolean>;
    disableIdManagement?: Computed<boolean> | Signal<boolean>;
  }
) => {
  if (!disableIdGeneration) {
    disableIdGeneration = signal<boolean>(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = signal<boolean>(false);
  }

  const inputId = signal<string>();
  let idUnwatch: WatchStopHandle | undefined = undefined; // effect中的 stop

  const isLabeledByFormItem = computed<boolean>(() => {
    return !!(
      !(props.label || props.ariaLabel) &&
      formItemContext &&
      formItemContext.inputIds &&
      unref(formItemContext.inputIds)!.length <= 1
    );
  });

  // Generate id for TdFormItem label if not provided as prop
  onMounted(() => {
    idUnwatch = watch(
      () => [unref(props.id), disableIdGeneration?.get()],
      ([id, disableIdGeneration]) => {
        const newId = id ?? (!disableIdGeneration ? useId().get() : undefined);
        if (newId !== inputId.get()) {
          if (formItemContext?.removeInputId) {
            inputId.get() && formItemContext.removeInputId(inputId.get()!);
            if (!disableIdManagement?.get() && !disableIdGeneration && newId) {
              formItemContext.addInputId(newId);
            }
          }
          inputId.set(newId);
        }
      },
      { immediate: true }
    );
  });

  onUnmounted(() => {
    idUnwatch && idUnwatch();
    if (formItemContext?.removeInputId) {
      inputId.get() && formItemContext.removeInputId(inputId.get()!);
    }
  });

  return {
    isLabeledByFormItem,
    inputId,
  };
};
