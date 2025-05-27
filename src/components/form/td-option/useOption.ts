// import { computed, getCurrentInstance, inject, toRaw, watch } from 'vue'
import { computed, toRaw, unref, watch } from '@type-dom/signals';
import { get, isEqual } from 'lodash-es';
import { ensureArray, escapeStringRegexp, isObject } from '@type-dom/utils';
import { getCurrentInstance, inject } from '@type-dom/framework';
import { selectGroupKey, selectKey } from '../td-select/token';
import { OptionStates, TdOptionProps } from './td-option.interface';
import { TdOption } from './td-option.class';

export function useOption(props: TdOptionProps, states: OptionStates) {
  // inject
  const select = inject(selectKey)!;
  const selectGroup = inject(selectGroupKey, { disabled: false });

  // computed
  const itemSelected = computed(() => {
    return contains(ensureArray(unref(select.props.modelValue)), props.value);
  });

  const limitReached = computed(() => {
    if (unref(select.props.multiple)) {
      const modelValue = ensureArray(unref(select.props.modelValue) ?? []);
      return (
        !itemSelected.get() &&
        modelValue.length >= unref(select.props.multipleLimit)! &&
        unref(select.props.multipleLimit)! > 0
      );
    } else {
      return false;
    }
  });

  const currentLabel = computed(() => {
    // console.warn('currentLabel computed . ');
    return props.label || (isObject(props.value) ? '' : props.value);
  });

  const currentValue = computed(() => {
    return props.value || props.label || '';
  });

  const isDisabled = computed(() => {
    return props.disabled || states.groupDisabled?.get() || limitReached.get();
  });

  const instance = getCurrentInstance() as TdOption;

  const contains = (arr: any[] = [], target: any) => {
    if (!isObject(props.value)) {
      return arr && arr.includes(target);
    } else {
      const valueKey = unref(select.props.valueKey)!;
      return (
        arr &&
        arr.some((item) => {
          return toRaw(get(item, valueKey)) === get(target, valueKey);
        })
      );
    }
  };

  const hoverItem = () => {
    // console.warn('hoverItem . ');
    if (!props.disabled && !selectGroup.disabled) {
      select.states.hoveringIndex = select.optionsArray?.indexOf(instance);
    }
  };

  const updateOption = (query: string) => {
    const regexp = new RegExp(escapeStringRegexp(query), 'i');
    states.visible?.set(regexp.test(currentLabel.get() as string) || props.created || false);
  };

  watch(
    () => currentLabel.get(),
    () => {
      // console.warn('watch currentLabel ');
      if (!props.created && !unref(select.props.remote)) select.setSelected();
    }
  );

  watch(
    () => unref(props.value),
    (val, oldVal) => {
      if (!select) return;
      const { remote, valueKey } = select.props;

      const shouldUpdate = remote ? val !== oldVal : !isEqual(val, oldVal)
      if (shouldUpdate) {
        select.onOptionDestroy(oldVal, instance)
        // console.warn('useOption then onOptionCreate instance ', instance);
        select.onOptionCreate(instance)
      }

      if (!props.created && !unref(remote)) {
        if (
          unref(valueKey) &&
          isObject(val) &&
          isObject(oldVal) &&
          (val as any)[unref(valueKey)!] === (oldVal as any)[unref(valueKey)!]
        ) {
          return;
        }
        select.setSelected();
      }
    }
  );

  watch(
    () => unref(selectGroup.disabled),
    () => {
      states.groupDisabled?.set(unref(selectGroup.disabled)) ;
    },
    { immediate: true }
  );

  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem,
    updateOption,
  };
}
