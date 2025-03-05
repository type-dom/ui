// import type { ComputedRef, InjectionKey } from 'vue'

import { InjectionKey } from '@type-dom/framework'
import { Ref } from '@type-dom/signals';

export interface UploadContext {
  accept: Ref<string | undefined>
}

export const uploadContextKey: InjectionKey<UploadContext> =
  Symbol('uploadContextKey')
