// import type { InjectionKey, SetupContext } from 'vue'
// import type { UseNamespaceReturn } from '@element-plus/hooks'

import { InjectionKey, ISlots } from '@type-dom/framework';
import { UseNamespaceReturn } from '../../../hooks/use-namespace';

interface DatePickerContext {
  slots: ISlots;
  pickerNs: UseNamespaceReturn;
}

export const ROOT_PICKER_INJECTION_KEY: InjectionKey<DatePickerContext> =
  Symbol();
