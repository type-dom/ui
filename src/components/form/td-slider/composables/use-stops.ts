// import { computed } from 'vue'
// import { debugWarn } from '@element-plus/utils'
// import type { CSSProperties, ComputedRef } from 'vue'
// import type { SliderInitData, SliderProps } from '../slider'

import { computed, Computed, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { debugWarn } from '@type-dom/utils';
import { SliderInitData, SliderProps } from '../td-slider.interface';

type Stops = {
  stops: Computed<number[]>
  getStopStyle: (position: number) => IStyle
}

export const useStops = (
  props: SliderProps,
  initData: SliderInitData,
  minValue: Computed<number>,
  maxValue: Computed<number>
): Stops => {
  // console.error('useStops . ');
  // console.error('props.step is ', props.step);
  const stops = computed(() => {
    if (!props.showStops || unref(props.min)! > unref(props.max)!) return []
    if (props.step === 0) {
      debugWarn('TdSlider', 'step should not be 0.')
      return []
    }

    const stopCount = (unref(props.max)! - unref(props.min)!) / props.step!
    const stepWidth = (100 * props.step!) / (unref(props.max)! - unref(props.min)!)
    const result = Array.from<number>({ length: stopCount - 1 }).map(
      (_, index) => (index + 1) * stepWidth
    )

    if (props.range) {
      return result.filter((step) => {
        return (
          step <
            (100 * (minValue.get() - unref(props.min)!)) / (unref(props.max)! - unref(props.min)!) ||
          step > (100 * (maxValue.get() - unref(props.min)!)) / (unref(props.max)! - unref(props.min)!)
        )
      })
    } else {
      return result.filter(
        (step) =>
          step >
          (100 * (initData.firstValue.get() - unref(props.min)!)) / (unref(props.max)! - unref(props.min)!)
      )
    }
  })

  const getStopStyle = (position: number): IStyle => {
    return props.vertical
      ? { bottom: `${position}%` }
      : { left: `${position}%` }
  }

  return {
    stops,
    getStopStyle,
  }
}
