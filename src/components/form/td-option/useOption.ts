// @ts-nocheck
// import { computed, getCurrentInstance, inject, toRaw, watch } from 'vue'
import { computed, toRaw, watch } from '@type-dom/signals';
import { get } from 'lodash';
import { ensureArray, escapeStringRegexp, isObject } from '@type-dom/utils';
import { getCurrentInstance, inject } from '@type-dom/framework';
import { selectGroupKey, selectKey } from '../td-select/token';

export function useOption(props, states) {
  // inject
  const select = inject(selectKey);
  const selectGroup = inject(selectGroupKey, { disabled: false });

  // computed
  const itemSelected = computed(() => {
    return contains(ensureArray(select.props.modelValue), props.value);
  });

  const limitReached = computed(() => {
    if (select.props.multiple) {
      const modelValue = ensureArray(select.props.modelValue ?? []);
      return (
        !itemSelected.value &&
        modelValue.length >= select.props.multipleLimit &&
        select.props.multipleLimit > 0
      );
    } else {
      return false;
    }
  });

  const currentLabel = computed(() => {
    return props.label || (isObject(props.value) ? '' : props.value);
  });

  const currentValue = computed(() => {
    return props.value || props.label || '';
  });

  const isDisabled = computed(() => {
    return props.disabled || states.groupDisabled || limitReached.value;
  });

  const instance = getCurrentInstance();

  const contains = (arr = [], target) => {
    if (!isObject(props.value)) {
      return arr && arr.includes(target);
    } else {
      const valueKey = select.props.valueKey;
      return (
        arr &&
        arr.some((item) => {
          return toRaw(get(item, valueKey)) === get(target, valueKey);
        })
      );
    }
  };

  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.states.hoveringIndex = select.optionsArray.indexOf(instance);
    }
  };

  const updateOption = (query: string) => {
    const regexp = new RegExp(escapeStringRegexp(query), 'i');
    states.visible = regexp.test(currentLabel.value) || props.created;
  };

  watch(
    () => currentLabel.get(),
    () => {
      if (!props.created && !select.props.remote) select.setSelected();
    }
  );

  watch(
    () => props.value,
    (val, oldVal) => {
      if (!select) return;
      const { remote, valueKey } = select?.props;

      if (val !== oldVal) {
        select.onOptionDestroy(oldVal, instance);
        select.onOptionCreate(instance);
      }

      if (!props.created && !remote) {
        if (
          valueKey &&
          isObject(val) &&
          isObject(oldVal) &&
          val[valueKey] === oldVal[valueKey]
        ) {
          return;
        }
        select.setSelected();
      }
    }
  );

  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled;
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
