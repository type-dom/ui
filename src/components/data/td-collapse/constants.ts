// import type { InjectionKey, Ref } from 'vue'
// import type { CollapseActiveName } from './collapse'

import { InjectionKey } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';
import { CollapseActiveName } from './td-collapse.interface';

export interface CollapseContext {
  activeNames: Ref<CollapseActiveName[]>;
  handleItemClick: (name: CollapseActiveName) => void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('collapseContextKey');
