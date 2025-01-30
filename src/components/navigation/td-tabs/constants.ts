// import type { ComputedRef, InjectionKey, Ref, Slots, UnwrapRef } from 'vue'
// import type { TabsProps } from './tabs'
// import type { TabPaneProps } from './tab-pane'

import { Computed, MaybeRef, Ref } from '@type-dom/signals';
import { TabPaneProps } from '../td-tab-pane/td-tab-pane.interface';
import { TabsProps } from './td-tabs.interface';
import { InjectionKey, ISlots } from '@type-dom/framework';

export type TabsPaneContext = {
  uid: number;
  slots?: ISlots;
  props: TabPaneProps;
  paneName: Computed<string | number | undefined>;
  active: Computed<boolean>;
  index?: MaybeRef<string | undefined>;
  isClosable: Computed<boolean | undefined>;
};

export interface TabsRootContext {
  props: TabsProps;
  currentName: Ref<string | number>;
  registerPane: (pane: TabsPaneContext) => void;
  sortPane: (pane: TabsPaneContext) => void;
  unregisterPane: (uid: number) => void;
}

export const tabsRootContextKey: InjectionKey<TabsRootContext> =
  Symbol('tabsRootContextKey');
