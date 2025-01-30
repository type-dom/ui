// import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
// import { debugWarn, keysOf } from '@element-plus/utils'
// import {
//   SIZE_INJECTION_KEY,
//   defaultInitialZIndex,
//   defaultNamespace,
//   emptyValuesContextKey,
//   localeContextKey,
//   namespaceContextKey,
//   useLocale,
//   useNamespace,
//   useZIndex,
//   zIndexContextKey,
// } from '@element-plus/hooks'
// import type { MaybeRef } from '@vueuse/core'
// import type { App, Ref } from 'vue'
import { signal, Ref, computed, MaybeRef, unref } from '@type-dom/signals';
import { debugWarn, keysOf } from '@type-dom/utils';

import {
  getCurrentInstance,
  inject,
  provide,
  TypeElement,
} from '@type-dom/framework';
import {
  defaultNamespace,
  namespaceContextKey,
  useNamespace,
} from '../../../../hooks/use-namespace';
import { localeContextKey, useLocale } from '../../../../hooks/use-locale';
import {
  defaultInitialZIndex,
  useZIndex,
  zIndexContextKey,
} from '../../../../hooks/use-z-index';
import { SIZE_INJECTION_KEY } from '../../../../hooks/use-size';
import { emptyValuesContextKey } from '../../../../hooks/use-empty-values';
import type { ConfigProviderContext } from '../constants';
import { configProviderContextKey } from '../constants';

// this is meant to fix global methods like `ElMessage(opts)`, this way we can inject current locale
// into the component as default injection value.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
const globalConfig = signal<ConfigProviderContext>();

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;
  if (key) {
    return computed(() => config.get()?.[key] ?? defaultValue);
  } else {
    return config;
  }
}

// for components like `ElMessage` `ElNotification` `ElMessageBox`.
export function useGlobalComponentSettings(
  block: string,
  sizeFallback?: MaybeRef<ConfigProviderContext['size']>
) {
  const config = useGlobalConfig();

  const ns = useNamespace(
    block,
    computed(() => config.get()?.namespace || defaultNamespace)
  );

  const locale = useLocale(computed(() => config.get()?.locale));
  const zIndex = useZIndex(
    computed(() => config.get()?.zIndex || defaultInitialZIndex)
  );
  const size = computed(() => unref(sizeFallback) || config.get()?.size || '');
  provideGlobalConfig(computed(() => unref(config) || {}));

  return {
    ns,
    locale,
    zIndex,
    size,
  };
}

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: TypeElement,
  global = false
) => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().'
    );
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.get()) return cfg;
    return mergeConfig(oldConfig.get(), cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(
    localeContextKey,
    computed(() => context.get().locale)
  );
  provideFn(
    namespaceContextKey,
    computed(() => context.get().namespace)
  );
  provideFn(
    zIndexContextKey,
    computed(() => context.get().zIndex)
  );

  provideFn(SIZE_INJECTION_KEY, {
    size: computed(() => context.get().size || ''),
  });

  provideFn(emptyValuesContextKey, {
    emptyValues: context?.get()?.emptyValues,
    valueOnClear: context?.get()?.valueOnClear,
  });

  if (global || !globalConfig.get()) {
    globalConfig.set(context.get());
  }
  return context;
};

const mergeConfig = (
  a: ConfigProviderContext,
  b: ConfigProviderContext
): ConfigProviderContext => {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])];
  const obj: Record<string, any> = {};
  for (const key of keys) {
    obj[key as string | number] = b[key] !== undefined ? b[key] : a[key];
  }
  return obj;
};
