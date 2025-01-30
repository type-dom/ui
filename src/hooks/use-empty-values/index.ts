import { debugWarn, isFunction } from '@type-dom/utils';
import {
  InjectionKey,
  getCurrentInstance,
  inject,
  AnyFn,
} from '@type-dom/framework';
import { computed } from '@type-dom/signals';

export type EmptyValuesContext = {
  /**
   * @description empty values supported by the component
   */
  emptyValues?: Array<any>;
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  valueOnClear?: string | number | boolean | AnyFn;
  //   type: [String, Number, Boolean, Function],
  //   default: undefined,
  //   validator: (val: any) => (isFunction(val) ? !val() : !val),
  // }
};

export const emptyValuesContextKey: InjectionKey<EmptyValuesContext> = Symbol(
  'emptyValuesContextKey'
);
export const SCOPE = 'use-empty-values';
export const DEFAULT_EMPTY_VALUES = ['', undefined, null];
export const DEFAULT_VALUE_ON_CLEAR = undefined;

export interface UseEmptyValuesProps {
  /**
   * @description empty values supported by the component
   */
  emptyValues?: any[];
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  valueOnClear?: string | number | boolean | AnyFn;
}

export const useEmptyValuesProps = {
  /**
   * @description empty values supported by the component
   */
  emptyValues: Array,
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  valueOnClear: {
    type: [String, Number, Boolean, Function],
    default: undefined,
    validator: (val: any) => (isFunction(val) ? !val() : !val),
  },
};

export const useEmptyValues = (
  props: EmptyValuesContext,
  defaultValue?: null | undefined
) => {
  const config = getCurrentInstance()
    ? inject<EmptyValuesContext>(emptyValuesContextKey, <EmptyValuesContext>{})
    : <EmptyValuesContext>{};

  const emptyValues: Array<any> =
    props.emptyValues || config?.emptyValues || DEFAULT_EMPTY_VALUES;

  const valueOnClear = computed(() => {
    // function is used for undefined cause undefined can't be a value of prop
    if (isFunction(props.valueOnClear)) {
      return props.valueOnClear();
    } else if (props.valueOnClear !== undefined) {
      return props.valueOnClear;
    } else if (isFunction(config.valueOnClear)) {
      return config.valueOnClear();
    } else if (config.valueOnClear !== undefined) {
      return config.valueOnClear;
    }
    return defaultValue !== undefined ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
  });

  const isEmptyValue = (value: any) => {
    return emptyValues.includes(value);
  };

  if (!emptyValues.includes(valueOnClear)) {
    debugWarn(SCOPE, 'value-on-clear should be a value of empty-values');
  }

  return {
    emptyValues,
    valueOnClear,
    isEmptyValue,
  };
};
