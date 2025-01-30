// import type { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'

import { InjectionKey } from '@type-dom/framework';
import { Computed } from '@type-dom/signals';

export interface TdPaginationContext {
  currentPage?: Computed<number>;
  pageCount?: Computed<number>;
  disabled?: Computed<boolean | undefined>;
  changeEvent?: (val: number) => void;
  handleSizeChange?: (val: number) => void;
}

export const tdPaginationKey: InjectionKey<TdPaginationContext> =
  Symbol('elPaginationKey');
