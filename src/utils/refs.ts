// import { isFunction } from '../types'
//
// import type { ComponentPublicInstance, Ref } from 'vue'

import { TypeNode } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';
import { isFunction } from '@type-dom/utils';

export type RefSetter = (el: Element | TypeNode | undefined) => void;

export const composeRefs = (
  ...refs: (Ref<HTMLElement | undefined> | RefSetter)[]
) => {
  return (el: Element | TypeNode | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(el as Element | TypeNode);
      } else {
        ref.set(el as HTMLElement | undefined);
      }
    });
  };
};
