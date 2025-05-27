// import { computed } from 'vue'
// import type { ComponentInternalInstance, Ref } from 'vue'

import { TypeElement } from '@type-dom/framework';
import { computed, unref, Ref } from '@type-dom/signals';
import { TdSubMenu } from '../td-sub-menu/td-sub-menu.class';
import { TdMenu } from './td-menu.class';
import { ensureArray } from '@type-dom/utils';

export default function useMenu(
  instance: TypeElement,
  currentIndex: Ref<string | undefined>
) {
  const indexPath = computed(() => {
    let parent = instance.parent!
    const path = ensureArray(currentIndex.get()!);
    while (parent.className !== 'TdMenu') {
      if ((parent as TdSubMenu).props.sIndex) { // todo
        path.unshift(unref((parent as TdSubMenu).props.sIndex!))
      }
      parent = parent.parent!
    }
    return path
  })

  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['TdMenu', 'TdSubMenu'].includes(parent.className!)) {
      parent = parent.parent
    }
    return parent! as TdMenu | TdSubMenu;
  })

  return {
    parentMenu,
    indexPath,
  }
}
