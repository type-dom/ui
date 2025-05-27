// import { unref } from 'vue'
// import { buildProps, isNumber } from '@element-plus/utils'
import { useTimeout } from '../use-timeout';
import { unref } from '@type-dom/signals';
import { isNumber } from '@type-dom/utils';

// import type { ExtractPropTypes, ToRefs } from 'vue'

export const useDelayedToggleProps: UseDelayedToggleProps = {
  showAfter: 0,
  hideAfter: 200,
  autoClose: 0,
};

export interface UseDelayedToggleProps {
  /**
   * @description delay of appearance, in millisecond
   *     default: 0,
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond
   *     default: 200,
   */
  hideAfter?: number;
  /**
   * @description disappear automatically, in millisecond
   *     default: 0,
   */
  autoClose?: number;
  open?: (event?: Event) => void;
  close?: (event?: Event) => void;
}

export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close,
}: UseDelayedToggleProps) => {
  const { registerTimeout } = useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose,
  } = useTimeout();

  const onOpen = (event?: Event) => {
    // console.log('use-delayed-toggle onOpen');
    registerTimeout(() => {
      open?.(event);

      const _autoClose = unref(autoClose);
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close?.(event);
        }, _autoClose);
      }
    }, unref(showAfter)!);
  };

  const onClose = (event?: Event) => {
    cancelTimeoutForAutoClose();

    registerTimeout(() => {
      close?.(event);
    }, unref(hideAfter)!);
  };

  return {
    onOpen,
    onClose,
  };
};
