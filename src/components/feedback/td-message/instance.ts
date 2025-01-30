// import { shallowReactive } from 'vue'
// import type { ComponentInternalInstance, VNode } from 'vue'
// import type { Mutable } from '@element-plus/utils'
// import type { MessageHandler, MessageProps } from './message'

import { Signal, signal } from '@type-dom/signals';
import { MessageContext } from './td-message.interface';

export const instances: Signal<MessageContext[]> = signal([]);

export const getInstance = (id: string) => {
  console.warn('getInstance, id is ', id);
  const idx = instances.get().findIndex((instance) => instance.id === id);
  const current = instances.get()[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances.get()[idx - 1];
  }
  return { current, prev };
};

export const getLastOffset = (id: string): number => {
  console.warn('getLastOffset, id is ', id);
  const { prev } = getInstance(id);
  if (!prev) return 0;
  // return prev.vm.exposed!.bottom.value
  return prev.vnode.bottom!.get();
};

export const getOffsetOrSpace = (id: string, offset: number) => {
  console.warn('getOffsetOrSpace, id is ', id);
  const idx = instances.get().findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};
