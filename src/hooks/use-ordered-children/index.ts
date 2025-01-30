// import { isVNode, shallowRef } from 'vue'
// import { flattedChildren } from '@element-plus/utils'
//
// import type { ComponentInternalInstance, VNode } from 'vue'

import { signal } from '@type-dom/signals';
import { flattedChildren, isVNode, TypeNode } from '@type-dom/framework';

const getOrderedChildren = <T>(
  vm: TypeNode,
  childComponentName: string,
  children: Record<number, T>
): T[] => {
  const nodes = flattedChildren(vm.childNodes).filter(
    (n): n is TypeNode =>
      isVNode(n) && n.className === childComponentName && !!n
  );
  const uids = nodes.map((n) => n.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};

export const useOrderedChildren = <T extends { uid: number }>(
  vm: TypeNode,
  childComponentName: string
) => {
  const children: Record<number, T> = {};
  const orderedChildren = signal<T[]>([]);

  // TODO: split into two functions: addChild and sortChildren
  const addChild = (child: T) => {
    children[child.uid] = child;
    orderedChildren.set(getOrderedChildren(vm, childComponentName, children));
  };
  const removeChild = (uid: number) => {
    delete children[uid];
    orderedChildren.set(
      orderedChildren.get().filter((children) => children.uid !== uid)
    );
  };

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  };
};
