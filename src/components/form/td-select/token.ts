// import type { ExtractPropTypes, InjectionKey } from 'vue'
// import type { SelectProps } from './select'

import { InjectionKey } from '@type-dom/framework';
import { SelectContext, SelectGroupContext } from './td-select.interface';

// For individual build sharing injection key, we had to make `Symbol` to string
export const selectGroupKey: InjectionKey<SelectGroupContext> =
  Symbol('TdSelectGroup');

export const selectKey: InjectionKey<SelectContext> = Symbol('TdSelect');

// export type ISelectProps = ExtractPropTypes<typeof SelectProps>
