import { getCurrentInstance, inject, InjectionKey } from '@type-dom/framework';
import { isClient } from '@type-dom/utils';
import { Computed, computed, MaybeRef, unref } from '@type-dom/signals';

export type TdIdInjectionContext = {
  prefix: number;
  current: number;
};

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};

export const ID_INJECTION_KEY: InjectionKey<TdIdInjectionContext> =
  Symbol('tdIdInjection');

export const useIdInjection = (): TdIdInjectionContext => {
  return getCurrentInstance()
    ? inject(ID_INJECTION_KEY, defaultIdInjection)
    : defaultIdInjection;
};

export const useId = (deterministicId?: MaybeRef<string>): Computed<string> => {
  // const idInjection = defaultIdInjection;
  const idInjection = useIdInjection();
  if (!isClient && idInjection === defaultIdInjection) {
    console.warn(
      'IdInjection',
      `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`
    );
  }

  // NOTE: Here we use `computedEager` to calculate the id value immediately, avoiding inconsistent id generation due to the lazy feature of `computed` when server rendering.
  return computed(
    () =>
      unref(deterministicId) ||
      `td-id-${idInjection.prefix}-${idInjection.current++}`
  );
};
