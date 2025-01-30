import { Computed, computed } from '@type-dom/signals';
import { getCurrentInstance } from '@type-dom/framework';
import { debugWarn, fromPairs } from '@type-dom/utils';

interface Params {
  excludeListeners?: boolean;
  excludeKeys?: Computed<string[]>;
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;

export const useAttrs = (params: Params = {}): Computed => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed<string[]>(() => {
    return (excludeKeys?.get() || []).concat(DEFAULT_EXCLUDE_KEYS);
  });

  const instance = getCurrentInstance();
  if (!instance) {
    debugWarn(
      'use-attrs',
      'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function'
    );
    return computed(() => ({}));
  }

  return computed(() =>
    fromPairs(
      Object.entries(instance.props.attrObj!).filter(
        ([key]) =>
          !allExcludeKeys.get().includes(key) &&
          !(excludeListeners && LISTENER_PREFIX.test(key))
      )
    )
  );
};
