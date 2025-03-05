import { computed, Ref, signal, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { Arrayable } from '@type-dom/utils';
import { nextTick } from '@type-dom/framework';
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants/event';
import { useFormItem } from '../../td-form/hooks/use-form-item';
import { SliderProps, SliderInitData } from '../td-slider.interface';
import { TdSliderButton } from '../button/button.class';
import { ButtonRefs } from '../button/button.interface';

export const useSlide = (
  props: SliderProps,
  initData: SliderInitData,
  emit: any
) => {
  const { form: elForm, formItem: tdFormItem } = useFormItem()

  const slider = signal<HTMLElement>()

  const firstButton = signal<TdSliderButton>()

  const secondButton = signal<TdSliderButton>()

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton,
  }

  const sliderDisabled = computed(() => {
    return unref(props.disabled) || unref(elForm?.disabled) || false
  })

  const minValue = computed(() => {
    return Math.min(initData.firstValue.get(), initData.secondValue.get())
  })

  const maxValue = computed(() => {
    return Math.max(initData.firstValue.get(), initData.secondValue.get())
  })

  const barSize = computed(() => {
    return props.range
      ? `${
        (100 * (maxValue.get() - minValue.get())) / (unref(props.max)! - unref(props.min)!)
      }%`
      : `${
        (100 * (initData.firstValue.get() - unref(props.min)!)) / (unref(props.max)! - unref(props.min)!)
      }%`
  })

  const barStart = computed(() => {
    return props.range
      ? `${(100 * (minValue.get() - unref(props.min)!)) / (unref(props.max)! - unref(props.min)!)}%`
      : '0%'
  })

  const runwayStyle = computed<IStyle>(() => {
    return props.vertical ? { height: props.height } : {}
  })

  const barStyle = computed<IStyle>(() => {
    return props.vertical
      ? {
        height: barSize.get(),
        bottom: barStart.get(),
      }
      : {
        width: barSize.get(),
        left: barStart.get(),
      }
  })

  const resetSize = () => {
    if (slider.get()) {
      initData.sliderSize.set(slider.get()![`client${props.vertical ? 'Height' : 'Width'}`]!)
    }
  }

  const getButtonRefByPercent = (
    percent: number
  ): Ref<TdSliderButton | undefined> => {
    const targetValue = unref(props.min)! + (percent * (unref(props.max)! - unref(props.min)!)) / 100
    if (!props.range) {
      return firstButton
    }
    let buttonRefName: 'firstButton' | 'secondButton'
    if (
      Math.abs(minValue.get() - targetValue) <
      Math.abs(maxValue.get() - targetValue)
    ) {
      buttonRefName =
        initData.firstValue.get() < initData.secondValue.get()
          ? 'firstButton'
          : 'secondButton'
    } else {
      buttonRefName =
        initData.firstValue.get() > initData.secondValue.get()
          ? 'firstButton'
          : 'secondButton'
    }
    return buttonRefs[buttonRefName]
  }

  const setPosition = (
    percent: number
  ): Ref<TdSliderButton | undefined> => {
    const buttonRef = getButtonRefByPercent(percent)
    buttonRef.get()?.setPosition?.(percent)
    return buttonRef
  }

  const setFirstValue = (firstValue: number | undefined) => {
    initData.firstValue.set(firstValue ?? unref(props.min)!)
    _emit(
      props.range ? [minValue.get(), maxValue.get()] : firstValue ?? unref(props.min)!
    )
  }

  const setSecondValue = (secondValue: number) => {
    initData.secondValue.set(secondValue)

    if (props.range) {
      _emit([minValue.get(), maxValue.get()])
    }
  }

  const _emit = (val: Arrayable<number>) => {
    emit(UPDATE_MODEL_EVENT, val)
    emit(INPUT_EVENT, val)
  }

  const emitChange = async () => {
    await nextTick()
    emit(
      CHANGE_EVENT,
      props.range ? [minValue.get(), maxValue.get()] : props.modelValue
    )
  }

  const handleSliderPointerEvent = (
    event?: MouseEvent | TouchEvent
  ): Ref<TdSliderButton | undefined> | undefined => {
    if (sliderDisabled.get() || initData.dragging) return
    resetSize()
    let newPercent = 0
    if (props.vertical) {
      const clientY =
        (event as TouchEvent).touches?.item(0)?.clientY ??
        (event as MouseEvent).clientY
      const sliderOffsetBottom = slider.get()!.getBoundingClientRect().bottom
      newPercent = ((sliderOffsetBottom - clientY) / initData.sliderSize.get()) * 100
    } else {
      const clientX =
        (event as TouchEvent).touches?.item(0)?.clientX ??
        (event as MouseEvent).clientX
      const sliderOffsetLeft = slider.get()!.getBoundingClientRect().left
      newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize.get()) * 100
    }
    if (newPercent < 0 || newPercent > 100) return
    return setPosition(newPercent)
  }

  const onSliderWrapperPrevent = (event: TouchEvent) => {
    if (
      buttonRefs['firstButton'].get()?.dragging ||
      buttonRefs['secondButton'].get()?.dragging
    ) {
      event.preventDefault()
    }
  }

  const onSliderDown = async (event?: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      await nextTick()
      buttonRef.get()!.onButtonDown?.(event)
    }
  }

  const onSliderClick = (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      emitChange()
    }
  }

  const onSliderMarkerDown = (position: number) => {
    if (sliderDisabled.get() || initData.dragging) return
    setPosition(position)
  }

  return {
    tdFormItem,
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    onSliderMarkerDown,
    setFirstValue,
    setSecondValue,
  }
};
