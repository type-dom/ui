import type { ConfigProviderProps } from './config-provider-props';
import { InjectionKey } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';
// import type { InjectionKey, Ref } from 'vue'

export type ConfigProviderContext = Partial<ConfigProviderProps>;

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
