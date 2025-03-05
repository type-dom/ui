// import { computed } from 'vue'
// import type { SliderProps } from '../slider'

import { computed, unref } from '@type-dom/signals';
import { SliderMarkerProps } from '../mark/mark.interface';
import { SliderProps } from '../td-slider.interface';

export interface Mark extends SliderMarkerProps {
  point: number
  position: number
}

export const useMarks = (props: SliderProps) => {
  return computed(() => {
    if (!props.marks) {
      return []
    }

    const marksKeys = Object.keys(props.marks)
    return marksKeys
      .map(Number.parseFloat)
      .sort((a, b) => a - b)
      .filter((point) => point <= unref(props.max)! && point >= unref(props.min)!)
      .map(
        (point): Mark => ({
          point,
          position: ((point - unref(props.min)!) * 100) / (unref(props.max)! - unref(props.min)!),
          mark: props.marks?.[point],
        })
      )
  })
}
