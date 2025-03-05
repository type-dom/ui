import { defineExpose, Div, For, Fragment, provide, TypeDiv, useEventListener } from '@type-dom/framework';
import { computed, signal, toRaw, toRefs, unref, watch } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { useLocale } from '../../../hooks/use-locale';
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants';
import { useFormSize } from '../td-form/hooks/use-form-common-props';
import { useFormItemInputId } from '../td-form/hooks/use-form-item';
import { TdInputNumber } from '../td-input-number/td-input-number.class';
import { sliderContextKey } from './constants';
import { TdSliderButton } from './button/button.class';
import { TdSliderMarker } from './mark/mark.class';
import { Mark, useMarks } from './composables/use-marks';
import { useWatch } from './composables/use-watch';
import { useLifecycle } from './composables/use-lifecycle';
import { useSlide } from './composables/use-slide';
import { useStops } from './composables/use-stops';
import {
  ITdSlider,
  SliderProps,
  sliderEmits,
  SliderInitData,
} from './td-slider.interface';
import { $sliderStyle } from './td-slider.style';
import { sliderProps } from './td-slider.const';
import './style/index';

export class TdSlider extends TypeDiv implements ITdSlider {
  className: 'TdSlider';
  override props: SliderProps;

  constructor(params: SliderProps = {}) {
    super();
    this.className = 'TdSlider';
    this.style.addObj($sliderStyle);

    this.addEmits(sliderEmits);
    this.assignProps(sliderProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('slider')
    const { t } = useLocale()

    const initData: SliderInitData = {
      firstValue: signal(0),
      secondValue: signal(0),
      oldValue: 0,
      dragging: false,
      sliderSize: signal(1),
    }

    const {
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
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      onSliderMarkerDown,
      setFirstValue,
      setSecondValue,
    } = useSlide(props, initData, emit)

    const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue)

    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: tdFormItem,
    })

    const sliderWrapperSize = useFormSize()
    const sliderInputSize = computed(
      () => props.inputSize || sliderWrapperSize.get()
    )

    const groupLabel = computed<string>(() => {
      return (
        unref(props.ariaLabel) ||
        t('el.slider.defaultLabel', {
          min: unref(props.min)!,
          max: unref(props.max)!,
        })
      )
    })

    const firstButtonLabel = computed<string>(() => {
      if (props.range) {
        return props.rangeStartLabel || t('el.slider.defaultRangeStartLabel')
      } else {
        return groupLabel.get()
      }
    })

    const firstValueText = computed<string>(() => {
      return props.formatValueText
        ? props.formatValueText(firstValue.get())
        : `${firstValue.get()}`
    })

    const secondButtonLabel = computed<string>(() => {
      return props.rangeEndLabel || t('el.slider.defaultRangeEndLabel')
    })

    const secondValueText = computed<string>(() => {
      return props.formatValueText
        ? props.formatValueText(secondValue.get())
        : `${secondValue.get()}`
    })

    const sliderKls = computed(() => [
      ns.b(),
      ns.m(sliderWrapperSize.get()),
      ns.is('vertical', props.vertical),
      { [ns.m('with-input')]: props.showInput },
    ])

    const markList = useMarks(props)

    useWatch(props, initData, minValue, maxValue, emit, tdFormItem!)
    const { firstValue, secondValue, sliderSize } = initData
    // console.warn('then initData sliderSize is ', initData, sliderSize)

    watch(firstValue, (newVal) => { // add by me
      emit(UPDATE_MODEL_EVENT, newVal);
    })
    watch(props.vModel, (newVal) => { // add by me
      firstValue.set(newVal as number);
      emit(INPUT_EVENT, newVal);
    })


    const precision = computed(() => {
      const precisions = [unref(props.min), unref(props.max), props.step].map((item) => {
        const decimal = `${item}`.split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    })

    const { sliderWrapper } = useLifecycle(props, initData, resetSize)

    const updateDragging = (val: boolean) => {
      initData.dragging = val
    }

    useEventListener(sliderWrapper, 'touchstart', onSliderWrapperPrevent, {
      passive: false,
    })
    useEventListener(sliderWrapper, 'touchmove', onSliderWrapperPrevent, {
      passive: false,
    })

    // console.warn('then props is ', props);
    provide(sliderContextKey, {
      ...props,
      sliderSize,
      disabled: unref(sliderDisabled),
      precision,
      emitChange,
      resetSize,
      updateDragging,
    })

    defineExpose({
      onSliderClick,
    })

    this.assignProps({
      refDom: sliderWrapper,
    });
    this.attr.addObj({
      id: props.range ? inputId.get() : undefined,
      class: sliderKls,
      role: props.range ? 'group' : undefined,
      ariaLabel: props.range && !isLabeledByFormItem.get() ? groupLabel.get() : undefined,
      ariaLabelledby: props.range && isLabeledByFormItem.get() ? tdFormItem?.labelId : undefined
    })
    this.style.addObj({
      height: props.height,
    })
    this.addChild(
      new Div({
          refDom: slider,
          class: [
            ns.e('runway'),
            { 'show-input': props.showInput && !props.range },
            ns.is('disabled', unref(sliderDisabled)),
          ],
          styleObj: runwayStyle,
          events: {
            mousedown: onSliderDown,
            touchstart: onSliderDown,
          },
          slot: [
            new Div({
              class: ns.e('bar'),
              styleObj: barStyle,
            }),
            new TdSliderButton({
              refEl: firstButton,
              vModel: firstValue,
              vertical: props.vertical,
              tooltipClass: props.tooltipClass,
              placement: props.placement,
              emits: {
                'update:model-value': setFirstValue
              },
              attrObj: {
                 id: !props.range ? inputId.get() : undefined,
                 role: 'slider',
                 ariaLabel:
                   props.range || !isLabeledByFormItem.get() ? firstButtonLabel : undefined,
                 ariaLabelledby:
                   !props.range && isLabeledByFormItem.get() ? tdFormItem?.labelId : undefined,
                 ariaValuemin: props.min,
                 ariaValuemax: props.range ? unref(secondValue) : unref(props.max),
                 ariaValuenow: firstValue,
                 ariaValuetext: firstValueText,
                 ariaOrientation: props.vertical ? 'vertical' : 'horizontal',
                 ariaDisabled: sliderDisabled,
               }
            }),
            new TdSliderButton({
              vIf: props.range,
              refEl: secondButton,
              vModel: secondValue,
              vertical: props.vertical,
              tooltipClass: props.tooltipClass,
              placement: props.placement,
              attrObj: {
                role: 'slider',
                ariaLabel: secondButtonLabel,
                ariaValuemin: firstValue,
                ariaValuemax: unref(props.max),
                ariaValuenow: secondValue,
                ariaValuetext: secondValueText,
                ariaOrientation: props.vertical ? 'vertical' : 'horizontal',
                ariaDisabled: sliderDisabled,
              },
              emits: {
                'update:model-value': setSecondValue
              }
            }),
            new Div({
              vIf: props.showStops,
              slot: new For({
                data: stops,
                getter: (item) => {
                  return new Div({
                    class: ns.e('stop'),
                    styleObj: getStopStyle(item as number)
                  })
                }
              })
            }),
            new Fragment({
              vIf: computed(() => markList.get().length > 0),
              slot: [
                new Div({
                  slot: new For({
                    data: markList,
                    getter: (item) => {
                      return new Div({
                        styleObj: getStopStyle((item as unknown as Mark).position as number),
                        class: [ns.e('stop'), ns.e('marks-stop')],
                      })
                    }
                  })
                }),
                new Div({
                  class: ns.e('marks'),
                  slot:  new For({
                    data: markList,
                    getter: (item) => {
                      return new TdSliderMarker({
                        mark: (item as unknown as Mark).mark,
                        styleObj: getStopStyle((item as unknown as Mark).position),
                        events: {
                          mousedown: (evt) => {
                            onSliderMarkerDown((item as unknown as Mark).position);
                            evt?.stopPropagation?.();
                          }
                        }
                      })
                    }
                  })
                })
              ]
            })
          ]
        }));
    this.addChild(new TdInputNumber({
      vIf: props.showInput && !props.range,
      // ref: input,
      vModel: firstValue,
      class: ns.e('input'),
      step: props.step,
      disabled: sliderDisabled.get(),
      controls: props.showInputControls,
      min: unref(props.min),
      max: unref(props.max),
      precision: precision.get(),
      // debounce: props.debounce,
      size: sliderInputSize.get(),
      emits: {
        'update:model-value': setFirstValue,
        change: emitChange,
      }
    }));
  }
}
