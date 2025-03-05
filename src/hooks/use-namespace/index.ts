import { getCurrentInstance, inject, InjectionKey } from '@type-dom/framework';
import { computed, Ref, signal, unref } from '@type-dom/signals';

export const defaultNamespace = 'td';
const statePrefix = 'is-';

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey');

export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
) => {
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(namespaceContextKey, signal(defaultNamespace))
      : signal(defaultNamespace));
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  const b = (blockSuffix = '') =>
    _bem(namespace.get(), block, blockSuffix, '', '');
  const e = (element?: string) =>
    element ? _bem(namespace.get(), block, '', element, '') : '';
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.get(), block, '', '', modifier) : '';
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.get(), block, blockSuffix, element, '')
      : '';
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.get(), block, '', element, modifier)
      : '';
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.get(), block, blockSuffix, '', modifier)
      : '';
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.get(), block, blockSuffix, element, modifier)
      : '';
  const is: {
    (name: string, state: boolean | '' | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | '' | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.get()}-${key}`] = object[key];
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.get()}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };

  const cssVarName = (name: string) => `--${namespace.get()}-${name}`;
  const cssVarBlockName = (name: string) =>
    `--${namespace.get()}-${block}-${name}`;

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  };
};

export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
