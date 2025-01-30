import { computed, signal, unref } from '@type-dom/signals';
import {
  AnyFn,
  arraySlot,
  inject,
  ISlotRaw,
  toValue,
  useSlots,
} from '@type-dom/framework';
import { useDeprecated } from '../../../hooks/use-deprecated';
import { useFormItem } from '../../form/td-form/hooks/use-form-item';
import {
  useFormDisabled,
  useFormSize,
} from '../../form/td-form/hooks/use-form-common-props';

import { buttonGroupContextKey } from './constants';
import { TdButtonProps } from './td-button.interface';
import { useGlobalConfig } from '../../configuration/td-config-provider';

export const useButton = (props: TdButtonProps, emit: AnyFn) => {
  useDeprecated(
    {
      from: 'type.text',
      replacement: 'link',
      version: '3.0.0',
      scope: 'props',
      ref: 'https://element-plus.org/en-US/component/button.html#button-attributes',
    },
    computed(() => props.type === 'text')
  );

  const buttonGroupContext = inject(buttonGroupContextKey, undefined);
  const globalConfig = useGlobalConfig<'button', TdButtonProps>('button');
  const { form } = useFormItem();
  const _size = useFormSize(computed(() => buttonGroupContext?.size));
  const _disabled = useFormDisabled();
  const _ref = signal<HTMLButtonElement>();
  const slots = useSlots();

  const _type = computed(
    () => props.type || unref(buttonGroupContext?.type) || ''
  );
  const autoInsertSpace = computed(
    () =>
      props.autoInsertSpace ??
      (globalConfig.get() as any)?.autoInsertSpace ??
      false
  );

  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        ariaDisabled: _disabled.get() || props.loading,
        disabled: _disabled.get() || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType,
      };
    }
    return {};
  });

  // add space between two characters in Chinese
  const shouldAddSpace = computed(() => {
    const defaultSlot = arraySlot(slots?.default);
    if (autoInsertSpace.get() && defaultSlot?.length === 1) {
      const slot = defaultSlot[0] as any;
      if (slot?.type === Text) {
        const text = slot.children as string;
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
      }
    }
    return false;
  });

  const handleClick = (evt?: MouseEvent) => {
    if (_disabled.get() || props.loading) {
      evt?.stopPropagation();
      return;
    }
    if (props.nativeType === 'reset') {
      form?.resetFields();
    }
    // emit('click', evt)
  };

  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    shouldAddSpace,
    handleClick,
  };
};
