// import { onMounted, ref, watch } from 'vue'
// import { isNumber, isObject, isUndefined } from '@element-plus/utils'
//
// import type { Ref } from 'vue'

import { isNumber, isObject, isUndefined } from '@type-dom/utils';
import { signal, Ref, watch } from '@type-dom/signals';
import { onMounted } from '@type-dom/framework';

export type ThrottleObjType = {
  leading?: number;
  trailing?: number;
  initVal?: boolean;
};
export type ThrottleType =
  | { leading?: number; trailing?: number; initVal?: boolean }
  | number;

export const useThrottleRender = (
  loading: Ref<boolean>,
  throttle: ThrottleType = 0
) => {
  if (throttle === 0) return loading;
  const initVal =
    isObject(throttle) && Boolean((throttle as ThrottleObjType).initVal);
  const throttled = signal(initVal);
  let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

  const dispatchThrottling = (timer: number | undefined) => {
    if (isUndefined(timer)) {
      throttled.set(loading.get());
      return;
    }
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(() => {
      throttled.set(loading.get());
    }, timer);
  };

  const dispatcher = (type: 'leading' | 'trailing') => {
    if (type === 'leading') {
      if (isNumber(throttle)) {
        dispatchThrottling(throttle);
      } else {
        dispatchThrottling(throttle.leading);
      }
    } else {
      if (isObject(throttle)) {
        dispatchThrottling((throttle as ThrottleObjType).trailing);
      } else {
        throttled.set(false);
      }
    }
  };

  onMounted(() => dispatcher('leading'));

  watch(
    () => loading.get(),
    (val) => {
      dispatcher(val ? 'leading' : 'trailing');
    }
  );

  return throttled;
};
