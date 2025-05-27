import { inject } from '@type-dom/framework';
import { AnyFn, isPropAbsent } from '@type-dom/utils';
import { computed, signal } from '@type-dom/signals';
import { useDeprecated } from '../../../hooks/use-deprecated';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { RadioButtonProps } from '../td-radio-button/td-radio-button.interface';
import {
  useFormDisabled,
  useFormSize,
} from '../td-form/hooks/use-form-common-props';
import { RadioProps } from './td-radio.interface';
import { radioGroupKey } from './constants';

export const useRadio = (
  props: RadioProps | RadioButtonProps,
  emit?: AnyFn
) => {
  const radioRef = signal<HTMLInputElement>();
  const radioGroup = inject(radioGroupKey, undefined);
  const isGroup = computed(() => !!radioGroup);
  const actualValue = computed(() => {
    // In version 2.x, if there's no props.value, props.label will act as props.value
    // In version 3.x, remove this computed value, use props.value instead.
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const modelValue = computed(
    () => {
      // console.error('get model value isGroup is  ', isGroup.get());
      return isGroup.get() ? radioGroup?.vModel?.get() : props.vModel?.get();
    },
    (val) => {
      // console.error('set model value is ', val);
      if (isGroup.get()) {
        radioGroup.changeEvent(val);
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val);
      }
      radioRef.get()!.checked = modelValue.get() === actualValue.get();
    },
  );

  const size = useFormSize(computed(() => radioGroup?.size));
  const disabled = useFormDisabled(computed(() => radioGroup?.disabled));
  const focus = signal(false);
  const tabIndex = computed(() => {
    return disabled.get() ||
      (isGroup.get() && modelValue.get() !== actualValue.get())
      ? -1
      : 0;
  });

  useDeprecated(
    {
      from: 'label act as value',
      replacement: 'value',
      version: '3.0.0',
      scope: 'el-radio',
      ref: 'https://element-plus.org/en-US/component/radio.html',
    },
    computed(() => isGroup.get() && isPropAbsent(props.value))
  );

  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue,
    actualValue,
  };
};
