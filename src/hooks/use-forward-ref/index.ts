// import { provide } from 'vue'
//
// import type { InjectionKey, ObjectDirective, Ref } from 'vue'

import { InjectionKey, provide } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';

type ForwardRefSetter = <T>(el: T) => void;

export type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter;
};

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext> =
  Symbol('elForwardRef');

export const useForwardRef = <T>(forwardRef?: Ref<T | undefined>) => {
  const setForwardRef = (el: unknown) => {
    forwardRef?.set(el as T); // el type todo check
  };

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  });
};

export const useForwardRefDirective = (setForwardRef: ForwardRefSetter) => {
  return {
    mounted(el: HTMLElement) {
      setForwardRef(el);
    },
    updated(el: HTMLElement) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    },
  };
};
