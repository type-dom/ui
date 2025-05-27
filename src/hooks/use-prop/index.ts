import { getCurrentInstance } from '@type-dom/framework';
import { Computed, toRef } from '@type-dom/signals';

export const useProp = <T>(name: string): Computed<T> => {
  const vm = getCurrentInstance();
  return toRef((vm?.props as any)?.[name]);
  // return computed<T>(() => (vm?.props as any)?.[name]);
};
