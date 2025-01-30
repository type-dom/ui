// import { computed, ref, shallowRef } from 'vue'
// import { useResizeObserver } from '@vueuse/core'

import { computed, signal } from '@type-dom/signals';
import { useResizeObserver } from '@type-dom/framework';

export function useCalcInputWidth() {
  const calculatorRef = signal<HTMLElement>();
  const calculatorWidth = signal(0);
  const MINIMUM_INPUT_WIDTH = 11;

  const inputStyle = computed(() => ({
    minWidth: `${Math.max(calculatorWidth.get(), MINIMUM_INPUT_WIDTH)}px`,
  }));

  const resetCalculatorWidth = () => {
    calculatorWidth.set(
      calculatorRef.get()?.getBoundingClientRect().width ?? 0
    );
  };

  useResizeObserver(calculatorRef, resetCalculatorWidth);

  return {
    calculatorRef,
    calculatorWidth,
    inputStyle,
  };
}
