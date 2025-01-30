// import { computed, getCurrentInstance, inject, ref, unref } from 'vue'
// import { debugWarn, isClient, isNumber } from '@element-plus/utils'
//
// import type { InjectionKey, Ref } from 'vue'

import { signal, Ref, computed, unref } from '@type-dom/signals';
import { getCurrentInstance, inject, InjectionKey } from '@type-dom/framework';
import { debugWarn, isClient, isNumber } from '@type-dom/utils';

export interface TdZIndexInjectionContext {
  current: number;
}

const initial: TdZIndexInjectionContext = {
  current: 0,
};

const zIndex = signal(0);

export const defaultInitialZIndex = 2000;

// For SSR
export const ZINDEX_INJECTION_KEY: InjectionKey<TdZIndexInjectionContext> =
  Symbol('elZIndexContextKey');

export const zIndexContextKey: InjectionKey<Ref<number | undefined>> =
  Symbol('zIndexContextKey');

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const increasingInjection = getCurrentInstance()
    ? inject(ZINDEX_INJECTION_KEY, initial)
    : initial;

  const zIndexInjection =
    zIndexOverrides ||
    (getCurrentInstance() ? inject(zIndexContextKey, undefined) : undefined);

  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber(zIndexFromInjection)
      ? zIndexFromInjection
      : defaultInitialZIndex;
  });

  const currentZIndex = computed(() => initialZIndex.get() + zIndex.get());

  const nextZIndex = () => {
    increasingInjection.current++;
    zIndex.set(increasingInjection.current);
    return currentZIndex.get();
  };

  if (!isClient && !inject(ZINDEX_INJECTION_KEY)) {
    debugWarn(
      'ZIndexInjection',
      `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`
    );
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  };
};

export type UseZIndexReturn = ReturnType<typeof useZIndex>;
