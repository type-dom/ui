import { computed, unref, Ref } from '@type-dom/signals';
import { inject, InjectionKey } from '@type-dom/framework';
import { ComponentSize } from '../../constants/size';

export const useSizeProps = {
  // size: useSizeProp,
};

export interface SizeContext {
  size: Ref<ComponentSize>;
}

export const SIZE_INJECTION_KEY: InjectionKey<SizeContext> = Symbol('size');

export const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {} as SizeContext);
  // return injectedSize?.size || '';
  return computed<ComponentSize>(() => {
    return unref(injectedSize.size) || '';
  });
};
