// import { nextTick, onMounted, ref } from 'vue'
// import { useEventListener } from '@vueuse/core'
// import { isArray, isNumber } from '@element-plus/utils'
// import type { SliderInitData, SliderProps } from '../slider'

import { signal, unref } from '@type-dom/signals';
import { nextTick, onMounted, useEventListener } from '@type-dom/framework';
import { isArray, isNumber } from '@type-dom/utils';
import { SliderInitData, SliderProps } from '../td-slider.interface';

export const useLifecycle = (
  props: SliderProps,
  initData: SliderInitData,
  resetSize: () => void
) => {
  const sliderWrapper = signal<HTMLElement>()

  onMounted(async () => {
    if (props.range) {
      if (isArray(props.modelValue)) {
        initData.firstValue.set(Math.max(unref(props.min)!, props.modelValue[0]));
        initData.secondValue.set(Math.min(unref(props.max)!, props.modelValue[1]))
      } else {
        initData.firstValue.set(unref(props.min)!)
        initData.secondValue.set(unref(props.max)!)
      }
      initData.oldValue = [initData.firstValue.get(), initData.secondValue.get()]
    } else {
      if (!isNumber(props.modelValue) || Number.isNaN(props.modelValue)) {
        initData.firstValue.set(unref(props.min)!)
      } else {
        initData.firstValue.set(Math.min(
          unref(props.max)!,
          Math.max(unref(props.min)!, props.modelValue)
        ))
      }
      initData.oldValue = initData.firstValue.get()
    }

    useEventListener(window, 'resize', resetSize)

    await nextTick()
    resetSize()
  })

  return {
    sliderWrapper,
  }
}
