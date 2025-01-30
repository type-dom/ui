// import type { CSSProperties, ComputedRef, InjectionKey, Ref } from 'vue'
// import type { UseNamespaceReturn } from '@element-plus/hooks'

import { Computed, Ref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { InjectionKey } from '@type-dom/framework';
import { UseNamespaceReturn } from '../../../hooks/use-namespace';

export type DialogContext = {
  dialogRef: Ref<HTMLElement | undefined>;
  headerRef: Ref<HTMLElement | undefined>;
  bodyId: Ref<string>;
  ns: UseNamespaceReturn;
  rendered: Ref<boolean>;
  style: Computed<IStyle>;
};

export const dialogInjectionKey: InjectionKey<DialogContext> =
  Symbol('dialogInjectionKey');
