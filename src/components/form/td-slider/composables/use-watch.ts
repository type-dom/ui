// import { watch } from 'vue'
// import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
// import { debugWarn, isArray, isNumber, throwError } from '@element-plus/utils'
// import type { ComputedRef, SetupContext } from 'vue'
// import type { Arrayable } from '@element-plus/utils'
// import type { FormItemContext } from '@element-plus/components/form'
// import type { SliderEmits, SliderInitData, SliderProps } from '../slider'
import {
  Arrayable,
  debugWarn,
  isArray,
  isNumber,
  throwError,
} from '@type-dom/utils';
import { Computed, unref, watch } from '@type-dom/signals';
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants/event';
import { FormItemContext } from '../../td-form/td-form.interface';
import { SliderInitData, SliderProps } from '../td-slider.interface';

export const useWatch = (
  props: SliderProps,
  initData: SliderInitData,
  minValue: Computed<number>,
  maxValue: Computed<number>,
  emit: any, //SetupContext<SliderEmits>['emit'],
  elFormItem: FormItemContext
) => {
  const _emit = (val: Arrayable<number>) => {
    emit(UPDATE_MODEL_EVENT, val)
    emit(INPUT_EVENT, val)
  }

  const valueChanged = () => {
    if (props.range) {
      return ![minValue.get(), maxValue.get()].every(
        (item, index) => item === (initData.oldValue as number[])[index]
      )
    } else {
      return props.modelValue !== initData.oldValue
    }
  }

  const setValues = () => {
    if (unref(props.min)! > unref(props.max)!) {
      throwError('Slider', 'min should not be greater than max.')
    }
    const val = props.vModel!.get() // props.modelValue
    if (props.range && isArray(val)) {
      if (val[1] < unref(props.min)!) {
        _emit([unref(props.min)!, unref(props.min)!])
      } else if (val[0] > unref(props.max)!) {
        _emit([unref(props.max)!, unref(props.max)!])
      } else if (val[0] < unref(props.min)!) {
        _emit([unref(props.min)!, val[1]])
      } else if (val[1] > unref(props.max)!) {
        _emit([val[0], unref(props.max)!])
      } else {
        initData.firstValue.set(val[0])
        initData.secondValue.set(val[1])
        if (valueChanged()) {
          if (props.validateEvent) {
            elFormItem?.validate?.('change').catch((err) => debugWarn(err))
          }
          initData.oldValue = val.slice()
        }
      }
    } else if (!props.range && isNumber(val) && !Number.isNaN(val)) {
      if (val < unref(props.min)!) {
        _emit(unref(props.min)!)
      } else if (val > unref(props.max)!) {
        _emit(unref(props.max)!)
      } else {
        initData.firstValue.set(val)
        if (valueChanged()) {
          if (props.validateEvent) {
            elFormItem?.validate?.('change').catch((err) => debugWarn(err))
          }
          initData.oldValue = val
        }
      }
    }
  }

  setValues()

  watch(
    () => initData.dragging.get(),
    (val) => {
      if (!val) {
        setValues()
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    props.vModel,
    (val, oldVal) => {
      // console.warn('watch props.vModel val is ', val);
      if (
        initData.dragging.get() ||
        (isArray(val) &&
          isArray(oldVal) &&
          val.every((item, index) => item === oldVal[index]) &&
          initData.firstValue.get() === val[0] &&
          initData.secondValue.get() === val[1])
      ) {
        return
      }
      setValues()
    },
    {
      immediate: true,
    }
  )

  watch(
    () => [unref(props.min), unref(props.max)],
    () => {
      setValues()
    }
  )
}
