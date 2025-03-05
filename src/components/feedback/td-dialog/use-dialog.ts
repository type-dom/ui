// import {
//   computed,
//   getCurrentInstance,
//   nextTick,
//   onMounted,
//   ref,
//   watch,
// } from 'vue'
// import { useTimeoutFn } from '@vueuse/core'
//
// import { isUndefined } from 'lodash-unified'
// import {
//   defaultNamespace,
//   useId,
//   useLockscreen,
//   useZIndex,
// } from '@element-plus/hooks'
// import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
// import { addUnit, isClient } from '@element-plus/utils'
// import { useGlobalConfig } from '@element-plus/components/config-provider'
//
// import type { CSSProperties, Ref, SetupContext } from 'vue'
// import type { DialogEmits, DialogProps } from './dialog'

import { IStyle } from '@type-dom/css-type';
import { addUnit, isClient, isUndefined } from '@type-dom/utils';
import { computed, Ref, signal, watch } from '@type-dom/signals';
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  useTimeoutFn,
} from '@type-dom/framework';
import { useGlobalConfig } from '../../configuration/td-config-provider';
import { useZIndex } from '../../../hooks/use-z-index';
import { useId } from '../../../hooks/use-id';
import { defaultNamespace } from '../../../hooks/use-namespace';
import { useLockscreen } from '../../../hooks/use-lockscreen';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { DialogProps } from './td-dialog.interface';

export const useDialog = (
  props: DialogProps,
  targetRef: Ref<HTMLElement | undefined>
) => {
  const instance = getCurrentInstance()!;
  const emit = instance.emit; // as DialogEmits['emit']
  const { nextZIndex } = useZIndex();

  let lastPosition = '';
  const titleId = useId();
  const bodyId = useId();
  const visible = signal(false);
  const closed = signal(false);
  const rendered = signal(false); // when destroyOnClose is true, we initialize it as false vise versa
  const zIndex = signal(props.zIndex ?? nextZIndex());

  let openTimer: (() => void) | undefined = undefined;
  let closeTimer: (() => void) | undefined = undefined;

  const namespace = useGlobalConfig('namespace', defaultNamespace);

  const style = computed<IStyle>(() => {
    const style: IStyle = {};
    const varPrefix = `--${namespace.get()}-dialog` as const;
    if (!props.fullscreen) {
      if (props.top) {
        (style as any)[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        (style as any)[`${varPrefix}-width`] = addUnit(props.width);
      }
    }
    return style;
  });

  const overlayDialogStyle = computed<IStyle>(() => {
    if (props.alignCenter) {
      return { display: 'flex' };
    }
    return {};
  });

  function afterEnter() {
    emit('opened');
  }

  function afterLeave() {
    emit('closed');
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.set(false);
    }
  }

  function beforeLeave() {
    emit('close');
  }

  function open() {
    closeTimer?.();
    openTimer?.();

    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }

  function close() {
    openTimer?.();
    closeTimer?.();

    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }

  function handleClose() {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) return;
      closed.set(true);
      visible.set(false);
    }

    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }

  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }

  function doOpen() {
    if (!isClient) return;
    visible.set(true);
  }

  function doClose() {
    visible.set(false);
  }

  function onOpenAutoFocus() {
    emit('openAutoFocus');
  }

  function onCloseAutoFocus() {
    emit('closeAutoFocus');
  }

  function onFocusoutPrevented(event?: CustomEvent) {
    if (event?.detail?.focusReason === 'pointer') {
      event?.preventDefault();
    }
  }

  if (props.lockScroll) {
    useLockscreen(visible);
  }

  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }

  watch(
    () => props.vModel?.get(),
    (val) => {
      // console.warn('watch vModel val is ', val);
      if (val) {
        closed.set(false);
        open();
        rendered.set(true); // enables lazy rendering
        zIndex.set(isUndefined(props.zIndex) ? nextZIndex() : zIndex.get() + 1);
        // this.$el.addEventListener('scroll', this.updatePopper)
        nextTick(() => {
          emit('open');
          if (targetRef.get()) {
            if (targetRef.get()?.parentElement) {
              targetRef.get()!.parentElement!.scrollTop = 0;
              targetRef.get()!.parentElement!.scrollLeft = 0;
            }
            targetRef.get()!.scrollTop = 0;
          }
        });
      } else {
        // this.$el.removeEventListener('scroll', this.updatePopper
        if (visible.get()) {
          close();
        }
      }
    }
  );

  watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.get()) return;
      if (val) {
        lastPosition = targetRef.get()!.style.transform;
        targetRef.get()!.style.transform = '';
      } else {
        targetRef.get()!.style.transform = lastPosition;
      }
    }
  );

  onMounted(() => {
    if (props.vModel?.get()) {
      visible.set(true);
      rendered.set(true); // enables lazy rendering
      open();
    }
  });

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
  };
};
