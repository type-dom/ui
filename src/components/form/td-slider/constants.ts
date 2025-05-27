// import type { ComputedRef, InjectionKey, Ref, ToRefs } from 'vue'
import { Computed, Ref } from '@type-dom/signals';
import { InjectionKey } from '@type-dom/framework';
import type { SliderProps } from './td-slider.interface'

export interface SliderContext extends SliderProps {
  precision: Computed<number>
  sliderSize: Ref<number>
  emitChange: () => void
  resetSize: () => void
  updateDragging: (val: boolean) => void
}

export const sliderContextKey: InjectionKey<SliderContext> =
  Symbol('sliderContextKey')
