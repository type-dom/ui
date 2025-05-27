// import {
//   computed,
//   getCurrentInstance,
//   onMounted,
//   ref,
//   shallowRef,
//   watch,
// } from 'vue'
// import { addUnit, getClientXY } from '@element-plus/utils'
// import { useLocale, useNamespace } from '@element-plus/hooks'
// import { EVENT_CODE } from '@element-plus/constants'
import { computed, signal, watch } from '@type-dom/signals';
import { getCurrentInstance, onMounted } from '@type-dom/framework';
import { addUnit, getClientXY } from '@type-dom/utils';
import { EVENT_CODE } from '../../../../constants/aria';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useLocale } from '../../../../hooks/use-locale';
import { draggable } from '../utils/draggable'
import type { AlphaSliderProps } from '../props/alpha-slider'

export const useAlphaSlider = (props: AlphaSliderProps) => {
  const instance = getCurrentInstance()!
  const { t } = useLocale()

  const thumb = signal<HTMLElement>()
  const bar = signal<HTMLElement>()

  const alpha = computed(() => props.color!.get('alpha') as number);
  const alphaLabel = computed(() => t('el.colorpicker.alphaLabel'))

  function handleClick(event?: MouseEvent | TouchEvent) {
    // console.warn('useAlphaSlider handleClick . ')
    if (!event) return;
    const target = event.target

    if (target !== thumb.get()) {
      handleDrag(event)
    }
    thumb.get()?.focus()
  }

  function handleDrag(event?: MouseEvent | TouchEvent) {
    // console.warn('useAlphaSlider handleDrag . ')
    if (!event) return;
    if (!bar.get() || !thumb.get()) return

    const el = instance.dom as HTMLElement
    const rect = el.getBoundingClientRect()
    const { clientX, clientY } = getClientXY(event)

    if (!props.vertical) {
      let left = clientX - rect.left
      left = Math.max(thumb.get().offsetWidth / 2, left)
      left = Math.min(left, rect.width - thumb.get().offsetWidth / 2)

      props.color?.set(
        'alpha',
        Math.round(
          ((left - thumb.get().offsetWidth / 2) /
            (rect.width - thumb.get().offsetWidth)) *
            100
        )
      )
    } else {
      let top = clientY - rect.top
      top = Math.max(thumb.get().offsetHeight / 2, top)
      top = Math.min(top, rect.height - thumb.get().offsetHeight / 2)

      props.color!.set(
        'alpha',
        Math.round(
          ((top - thumb.get().offsetHeight / 2) /
            (rect.height - thumb.get().offsetHeight)) *
            100
        )
      )
    }
  }

  function handleKeydown(event?: KeyboardEvent) {
    // console.warn('useAlphaSlider handleKeydown . ')
    if (!event) return;
    const { code, shiftKey } = event;
    const step = shiftKey ? 10 : 1

    switch (code) {
      case EVENT_CODE.left:
      case EVENT_CODE.down:
        event.preventDefault()
        event.stopPropagation()
        incrementPosition(-step)
        break
      case EVENT_CODE.right:
      case EVENT_CODE.up:
        event.preventDefault()
        event.stopPropagation()
        incrementPosition(step)
        break
    }
  }

  function incrementPosition(step: number) {
    let next = alpha.get()  + step
    next = next < 0 ? 0 : next > 100 ? 100 : next
    props.color!.set('alpha', next)
  }

  return {
    thumb,
    bar,
    alpha,
    alphaLabel,
    handleDrag,
    handleClick,
    handleKeydown,
  }
}

export const useAlphaSliderDOM = (
  props: AlphaSliderProps,
  {
    bar,
    thumb,
    handleDrag,
  }: Pick<ReturnType<typeof useAlphaSlider>, 'bar' | 'thumb' | 'handleDrag'>
) => {
  const instance = getCurrentInstance()!

  const ns = useNamespace('color-alpha-slider')
  // refs

  const thumbLeft = signal(0)
  const thumbTop = signal(0)
  const background = signal<string>()

  function getThumbLeft() {
    // console.warn('getThumbLeft . ');
    if (!thumb.get()) return 0

    if (props.vertical) return 0
    const el = instance.dom as HTMLElement;
    const alpha = props.color!.get('alpha') as number

    if (!el) return 0
    return Math.round(
      (alpha * (el.offsetWidth - thumb.get().offsetWidth / 2)) / 100
    )
  }

  function getThumbTop() {
    if (!thumb.get()) return 0

    const el = instance.dom as HTMLElement
    if (!props.vertical) return 0
    const alpha = props.color!.get('alpha') as number;

    if (!el) return 0
    return Math.round(
      (alpha * (el.offsetHeight - thumb.get().offsetHeight / 2)) / 100
    )
  }

  function getBackground() {
    if (props.color && props.color.value.get()) {
      const { r, g, b } = props.color.toRgb()
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`
    }
    return ''
  }

  function update() {
    // console.warn('usAlphaSliderDOM update . ');
    thumbLeft.set(getThumbLeft())
    thumbTop.set(getThumbTop())
    background.set(getBackground())
  }

  onMounted(() => {
    // console.warn('onMounted . ');
    if (!bar.get() || !thumb.get()) return

    const dragConfig = {
      drag: (event: MouseEvent | TouchEvent) => {
        handleDrag(event)
      },
      end: (event: MouseEvent | TouchEvent) => {
        handleDrag(event)
      },
    }

    draggable(bar.get(), dragConfig)
    draggable(thumb.get(), dragConfig)
    update()
  })

  watch(
    () => props.color?.get('alpha'),
    () => update()
  )
  watch(
    () => props.color?.value.get(),
    () => update()
  )

  const rootKls = computed(() => [ns.b(), ns.is('vertical', props.vertical)])
  const barKls = computed(() => ns.e('bar'))
  const thumbKls = computed(() => ns.e('thumb'))
  const barStyle = computed(() => ({ background: background.get() }))
  const thumbStyle = computed(() => ({
    left: addUnit(thumbLeft.get()),
    top: addUnit(thumbTop.get()),
  }))

  return { rootKls, barKls, barStyle, thumbKls, thumbStyle, update }
}
