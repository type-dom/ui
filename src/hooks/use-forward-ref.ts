import { InjectionKey } from '@type-dom/framework';

type ForwardRefSetter = (el?: HTMLElement) => void

export type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext> =
  Symbol('tdForwardRef');


export const useForwardRef = (provide: (key: string | symbol, value: any) => void, forwardRef?: HTMLElement) => {
  const setForwardRef = (el: HTMLElement) => {
    forwardRef = el
  };

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  })
};


export const useForwardRefDirective = (
  setForwardRef: ForwardRefSetter
) => {
  return {
    mounted(el: HTMLElement) {
      setForwardRef(el)
    },
    updated(el: HTMLElement) {
      setForwardRef(el)
    },
    unmounted() {
      setForwardRef(undefined)
    },
  }
}
