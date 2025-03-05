// import { computed, inject, nextTick, ref, watch } from 'vue'
// import { debounce } from 'lodash-unified'
import { computed, Computed, Ref, signal, unref, watch } from '@type-dom/signals';
import { inject, nextTick, useEventListener } from '@type-dom/framework';
import { debounce } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
// import { useEventListener } from '@vueuse/core'

// import type { CSSProperties, ComputedRef, Ref, SetupContext } from 'vue'
import { TdTooltip } from '../../../feedback/td-tooltip/td-tooltip.class';
import { EVENT_CODE } from '../../../../constants/aria';
import { UPDATE_MODEL_EVENT } from '../../../../constants/event';
// import type { TooltipInstance } from '@element-plus/components/tooltip'
// import { EVENT_CODE, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { sliderContextKey } from '../constants'
import type { SliderProps } from '../td-slider.interface'
import type {
  // SliderButtonEmits,
  SliderButtonInitData,
  SliderButtonProps,
} from '../button/button.interface'

const useTooltip = (
  props: SliderButtonProps,
  formatTooltip?: SliderProps['formatTooltip'], // Ref<SliderProps['formatTooltip']>, edit by me
  showTooltip?: SliderProps['showTooltip'], // Ref<SliderProps['showTooltip']>
) => {
  const tooltip = signal<TdTooltip>()

  const tooltipVisible = signal(false)

  const enableFormat = computed(() => {
    return formatTooltip instanceof Function
  })

  const formatValue = computed(() => {
    return (
      (enableFormat.get() && formatTooltip?.(props.vModel?.get())) ||
      props.vModel?.get()
    ) as number | undefined
  })

  const displayTooltip = debounce(() => {
    showTooltip && (tooltipVisible.set(true))
  }, 50)

  const hideTooltip = debounce(() => {
    showTooltip && (tooltipVisible.set(false))
  }, 50)

  return {
    tooltip,
    tooltipVisible,
    formatValue,
    displayTooltip,
    hideTooltip,
  }
}

type HTMLType = HTMLDivElement | undefined
type UseSliderButtonType = (
  props: SliderButtonProps,
  initData: SliderButtonInitData,
  emit: any // SetupContext<SliderButtonEmits>['emit']
) => {
  disabled: Ref<boolean>
  button: Ref<HTMLType>
  tooltip: Ref<TdTooltip | undefined>
  tooltipVisible: Ref<boolean>
  showTooltip: Ref<SliderProps['showTooltip']>
  persistent: Ref<SliderProps['persistent']>
  wrapperStyle: Computed<IStyle>
  formatValue: Computed<number | string>
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  onButtonDown: (event?: MouseEvent | TouchEvent) => void
  onKeyDown: (event?: KeyboardEvent) => void
  setPosition: (newPosition: number) => Promise<void>
}

export const useSliderButton = (
  props: SliderButtonProps,
  initData: SliderButtonInitData,
  emit: any, // SetupContext<SliderButtonEmits>['emit']
) => {
  const {
    disabled,
    min: minValue,  // is a function, not a number ???? 变量被提升了。
    max,
    step,
    showTooltip,
    persistent,
    precision,
    sliderSize,
    formatTooltip,
    emitChange,
    resetSize,
    updateDragging,
  } = inject(sliderContextKey)!
  // console.warn('sliderContextKey props step is ', step);

  const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } =
    useTooltip(props, formatTooltip, showTooltip!)

  const button = signal<HTMLDivElement>()

  const currentPosition = computed(() => {
    return `${
      ((props.vModel!.get()! - unref(minValue)!) / (unref(max)! - unref(minValue)!)) * 100
    }%`
  })

  const wrapperStyle: Computed<IStyle> = computed(() => {
    return props.vertical
      ? { bottom: currentPosition.get() }
      : { left: currentPosition.get() } as IStyle
  })

  const handleMouseEnter = () => {
    initData.hovering = true
    displayTooltip()
  }

  const handleMouseLeave = () => {
    initData.hovering = false
    if (!initData.dragging) {
      hideTooltip()
    }
  }

  const onButtonDown = (event?: MouseEvent | TouchEvent) => {
    // console.warn('onButtonDown');
    if (disabled) return
    event?.preventDefault()
    onDragStart(event)
    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
    button.get()?.focus()
  }

  const incrementPosition = (amount: number) => {
    // console.warn('incrementPosition . ');
    if (disabled) return
    initData.newPosition =
      Number.parseFloat(currentPosition.get()) +
      (amount / (unref(max)! - unref(minValue)!)) * 100
    setPosition(initData.newPosition)
    emitChange()
  }

  const onLeftKeyDown = () => {
    incrementPosition(-step!)
  }

  const onRightKeyDown = () => {
    incrementPosition(step!)
  }

  const onPageDownKeyDown = () => {
    incrementPosition(-step! * 4)
  }

  const onPageUpKeyDown = () => {
    incrementPosition(step! * 4)
  }

  const onHomeKeyDown = () => {
    if (disabled) return
    setPosition(0)
    emitChange()
  }

  const onEndKeyDown = () => {
    if (disabled) return
    setPosition(100)
    emitChange()
  }

  const onKeyDown = (event?: KeyboardEvent) => {
    let isPreventDefault = true

    switch (event?.code) {
      case EVENT_CODE.left:
      case EVENT_CODE.down:
        onLeftKeyDown()
        break
      case EVENT_CODE.right:
      case EVENT_CODE.up:
        onRightKeyDown()
        break
      case EVENT_CODE.home:
        onHomeKeyDown()
        break
      case EVENT_CODE.end:
        onEndKeyDown()
        break
      case EVENT_CODE.pageDown:
        onPageDownKeyDown()
        break
      case EVENT_CODE.pageUp:
        onPageUpKeyDown()
        break
      default:
        isPreventDefault = false
        break
    }

    isPreventDefault && event?.preventDefault()
  }

  const getClientXY = (event?: MouseEvent | TouchEvent) => {
    let clientX: number
    let clientY: number
    if (event?.type.startsWith('touch')) {
      clientY = (event as TouchEvent).touches[0].clientY
      clientX = (event as TouchEvent).touches[0].clientX
    } else {
      clientY = (event as MouseEvent).clientY
      clientX = (event as MouseEvent).clientX
    }
    return {
      clientX,
      clientY,
    }
  }

  const onDragStart = (event?: MouseEvent | TouchEvent) => {
    // console.warn('onDragStart');
    initData.dragging = true
    initData.isClick = true
    const { clientX, clientY } = getClientXY(event)
    if (props.vertical) {
      initData.startY = clientY
    } else {
      initData.startX = clientX
    }
    initData.startPosition = Number.parseFloat(currentPosition.get())
    initData.newPosition = initData.startPosition
  }

  const onDragging = (event: MouseEvent | TouchEvent) => {
    // console.warn('onDragging');
    if (initData.dragging) {
      initData.isClick = false
      displayTooltip()
      resetSize()
      let diff: number
      const { clientX, clientY } = getClientXY(event)
      if (props.vertical) {
        initData.currentY = clientY
        diff = ((initData.startY - initData.currentY) / sliderSize.get()) * 100
      } else {
        initData.currentX = clientX
        diff = ((initData.currentX - initData.startX) / sliderSize.get()) * 100
      }
      initData.newPosition = initData.startPosition + diff
      setPosition(initData.newPosition)
    }
  }

  const onDragEnd = () => {
    // console.warn('onDragEnd');
    if (initData.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        initData.dragging = false
        if (!initData.hovering) {
          hideTooltip()
        }
        if (!initData.isClick) {
          setPosition(initData.newPosition)
        }
        emitChange()
      }, 0)
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('touchmove', onDragging)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      window.removeEventListener('contextmenu', onDragEnd)
    }
  }

  const setPosition = async (newPosition: number) => {
    // console.warn('setPosition');
    if (newPosition === null || Number.isNaN(+newPosition)) return
    if (newPosition < 0) {
      newPosition = 0
    } else if (newPosition > 100) {
      newPosition = 100
    }
    const lengthPerStep = 100 / ((unref(max)! - unref(minValue)!) / step!)
    const steps = Math.round(newPosition / lengthPerStep)
    let value =
      steps * lengthPerStep * (unref(max)! - unref(minValue)!) * 0.01 + unref(minValue)!
    value = Number.parseFloat(value.toFixed(precision.get()))

    if (value !== props.modelValue) {
      emit(UPDATE_MODEL_EVENT, value)
    }

    if (!initData.dragging && props.modelValue !== initData.oldValue) {
      initData.oldValue = props.modelValue
    }

    await nextTick()
    initData.dragging && displayTooltip()
    tooltip?.get()!.updatePopper?.()
  }

  watch(
    () => initData.dragging,
    (val) => {
      updateDragging(val)
    }
  )

  useEventListener(button, 'touchstart', onButtonDown, { passive: false })

  return {
    disabled,
    button,
    tooltip,
    tooltipVisible,
    showTooltip,
    persistent,
    wrapperStyle,
    formatValue,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    onKeyDown,
    setPosition,
  }
}
