// import { computed, getCurrentInstance, onMounted, watch } from 'vue'
// import {
//   buildProp,
//   definePropType,
//   isBoolean,
//   isClient,
//   isFunction,
// } from '@element-plus/utils'
// import type { ExtractPropType } from '@element-plus/utils'
// import type { RouteLocationNormalizedLoaded } from 'vue-router'
//
// import type { ComponentPublicInstance, ExtractPropTypes, Ref } from 'vue'

import { getCurrentInstance, onMounted } from '@type-dom/framework';
import { isBoolean, isClient, isFunction } from '@type-dom/utils';
import { computed, watch, Ref, unref } from '@type-dom/signals';

const _prop: boolean | null = null;
const _event = (val: boolean) => {
  //
};

export type UseModelTogglePropsRaw<T extends string> = {
  [K in T]: typeof _prop;
} & {
  [K in `onUpdate:${T}`]: typeof _event;
};

export type UseModelTogglePropsGeneric<T extends string> = {
  [K in T]: typeof _prop;
} & {
  [K in `onUpdate:${T}`]: typeof _event;
};

export const createModelToggleComposable = <T extends string>(name: T) => {
  const updateEventKey = `update:${name}` as const;
  const updateEventKeyRaw = `onUpdate:${name}` as const;
  const useModelToggleEmits = [updateEventKey];

  const useModelToggleProps = {
    [name]: _prop,
    [updateEventKeyRaw]: _event,
  } as UseModelTogglePropsRaw<T>;

  const useModelToggle = ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide,
  }: ModelToggleParams) => {
    const instance = getCurrentInstance()!;
    const { emit } = instance;
    const props = instance.props as UseModelTogglePropsGeneric<T> & {
      disabled: boolean;
    };
    const hasUpdateHandler = computed(() => {
      // console.warn('[useModelToggle]', ' hasUpdateHandler . updateEventKeyRaw is ', updateEventKeyRaw);
      return isFunction(props[updateEventKeyRaw]);
    });
    // when it matches the default value we say this is absent
    // though this could be mistakenly passed from the user but we need to rule out that
    // condition
    // console.error('useModelToggle props[' + name + '] is ', props[name]);
    // const isModelBindingAbsent = computed(() => props[name] === null); // visible控制显示、隐藏
    const isModelBindingAbsent = computed(() => !unref(props[name]));

    const doShow = (event?: Event) => {
      if (indicator.get() === true) {
        return;
      }

      indicator.set(true);
      if (toggleReason) {
        toggleReason.set(event);
      }
      if (isFunction(onShow)) {
        onShow(event);
      }
    };

    const doHide = (event?: Event) => {
      if (indicator.get() === false) {
        return;
      }

      indicator.set(false);
      if (toggleReason) {
        toggleReason.set(event);
      }
      if (isFunction(onHide)) {
        onHide(event);
      }
    };

    const show = (event?: Event) => {
      // console.warn('[useModelToggle]', 'show .');
      if (
        props.disabled === true ||
        (isFunction(shouldProceed) && !shouldProceed())
      ) {
        return;
      }
      const shouldEmit = hasUpdateHandler.get() && isClient;

      if (shouldEmit) {
        emit(updateEventKey, true);
      }

      if (isModelBindingAbsent.get() || !shouldEmit) {
        doShow(event);
      }
    };

    const hide = (event?: Event) => {
      if (props.disabled === true || !isClient) return;

      const shouldEmit = hasUpdateHandler.get() && isClient;

      if (shouldEmit) {
        emit(updateEventKey, false);
      }

      if (isModelBindingAbsent.get() || !shouldEmit) {
        doHide(event);
      }
    };

    const onChange = (val: boolean) => {
      // console.warn('[useModelToggle] onChange val is ', val);
      if (!isBoolean(val)) return;
      if (props.disabled && val) {
        if (hasUpdateHandler.get()) {
          emit(updateEventKey, false);
        }
      } else if (indicator.get() !== val) {
        if (val) {
          doShow();
        } else {
          doHide();
        }
      }
    };

    const toggle = () => {
      if (indicator.get()) {
        hide();
      } else {
        show();
      }
    };

    watch(() => unref(props[name]), onChange);

    // todo
    if (
      shouldHideWhenRouteChanges
      // &&
      // instance.appContext.config.globalProperties.$route !== undefined
    ) {
      // watch(
      //   () =>
      //     ({
      //   //     todo
      //   //   ...(
      //   //     instance.proxy as ComponentPublicInstance<{
      //   //       $route: RouteLocationNormalizedLoaded
      //   //     }>
      //   //   ).$route,
      //   }),
      //   () => {
      //     if (shouldHideWhenRouteChanges.get() && indicator.get()) {
      //       hide()
      //     }
      //   }
      // )
    }

    onMounted(() => {
      onChange(unref(props[name]));
    });

    return {
      hide,
      show,
      toggle,
      hasUpdateHandler,
    };
  };

  return {
    useModelToggle,
    useModelToggleProps,
    useModelToggleEmits,
  };
};

const { useModelToggle, useModelToggleProps, useModelToggleEmits } =
  createModelToggleComposable('modelValue');

export { useModelToggle, useModelToggleEmits, useModelToggleProps };

export type UseModelToggleProps = typeof useModelToggleProps;

export type ModelToggleParams = {
  indicator: Ref<boolean>;
  toggleReason?: Ref<Event | undefined>;
  shouldHideWhenRouteChanges?: Ref<boolean>;
  shouldProceed?: () => boolean;
  onShow?: (event?: Event) => void;
  onHide?: (event?: Event) => void;
};
