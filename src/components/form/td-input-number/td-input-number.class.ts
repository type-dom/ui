import { defineExpose, onMounted, onUpdated, Span, TypeDiv } from '@type-dom/framework';
import { computed, Signal, signal, watch } from '@type-dom/signals';
import {
  AnyFn,
  debugWarn,
  isFirefox,
  isNil,
  isNumber,
  isString,
  isUndefined,
  throwError
} from '@type-dom/utils';
import { ElArrowDownSvg, ElArrowUpSvg, ElMinusSvg, ElPlusSvg } from '@type-dom/svgs';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { useLocale } from '../../../hooks/use-locale';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdInput } from '../td-input/td-input.class';
import { useFormDisabled, useFormSize } from '../td-form/hooks/use-form-common-props';
import { useFormItem } from '../td-form/hooks/use-form-item';
import { InputNumberProps } from './td-input-number.interface';
import { inputNumberEmits, inputNumberProps } from './td-input-number.const';
import './style/index';

export class TdInputNumber extends TypeDiv implements TdInputNumber {
  className: 'TdInputNumber';
  override props: InputNumberProps;
  focus?: AnyFn;
  blur?: AnyFn;

  constructor(params: InputNumberProps = {}) {
    super();
    this.className = 'TdInputNumber';
    this.attr.addName('td-input-number');

    this.addEmits(inputNumberEmits);
    this.assignProps(inputNumberProps);
    this.props = this.useParams(params)
  }
  override setup() {

    const props = this.props
    const emit = this.emit;

    const { t } = useLocale()
    const ns = useNamespace('input-number')
    const input = signal<TdInput>()

    interface Data {
      curValue: Signal<number | null | undefined> | undefined;
      userInput: Signal<null | number | string>;
    }
    const data: Data = {
      curValue: props.vModel,
      userInput: signal(null),
    }

    const { formItem } = useFormItem()

    const minDisabled = computed(
      () => isNumber(props.vModel?.get()) && props.vModel?.get() <= props.min!
    )
    const maxDisabled = computed(
      () => isNumber(props.vModel?.get()) && props.vModel?.get() >= props.max!
    )

    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step)
      if (!isUndefined(props.precision)) {
        if (stepPrecision > props.precision) {
          debugWarn(
            'InputNumber',
            'precision should not be less than the decimal places of step'
          )
        }
        return props.precision
      } else {
        return Math.max(getPrecision(props.vModel?.get()), stepPrecision)
      }
    })
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === 'right'
    })

    const inputNumberSize = useFormSize()
    const inputNumberDisabled = useFormDisabled()

    const displayValue = computed(() => {
      // console.warn('displayValue  . ');
      if (data.userInput.get() !== null) {
        return data.userInput.get()
      }
      let currentValue: number | string | undefined | null = data.curValue?.get()
      if (isNil(currentValue)) return ''
      if (isNumber(currentValue)) {
        if (Number.isNaN(currentValue)) return ''
        if (!isUndefined(props.precision)) {
          currentValue = currentValue.toFixed(props.precision)
        }
      }
      return currentValue
    })
    const toPrecision = (num: number, pre?: number) => {
      if (isUndefined(pre)) pre = numPrecision.get()
      if (pre === 0) return Math.round(num)
      let snum = String(num)
      const pointPos = snum.indexOf('.')
      if (pointPos === -1) return num
      const nums = snum.replace('.', '').split('')
      const datum = nums[pointPos + pre!]
      if (!datum) return num
      const length = snum.length
      if (snum.charAt(length - 1) === '5') {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`
      }
      return Number.parseFloat(Number(snum).toFixed(pre))
    }
    const getPrecision = (value: number | null | undefined) => {
      if (isNil(value)) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    }
    const ensurePrecision = (val: number, coefficient: 1 | -1 = 1) => {
      if (!isNumber(val)) return data.curValue?.get()
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return toPrecision(val + props.step! * coefficient)
    }
    const increase = () => {
      // console.warn('increase  . ');
      if (props.readonly || inputNumberDisabled.get() || maxDisabled.get()) return
      const value = Number(displayValue.get()) || 0
      const newVal = ensurePrecision(value) as number;
      setCurrentValue(newVal)
      emit(INPUT_EVENT, data.curValue?.get())
      setCurrentValueToModelValue()
    }
    const decrease = () => {
      // console.warn('decrease  . ');
      if (props.readonly || inputNumberDisabled.get() || minDisabled.get()) return
      const value = Number(displayValue.get()) || 0
      const newVal = ensurePrecision(value, -1) as number
      setCurrentValue(newVal)
      emit(INPUT_EVENT, data.curValue?.get())
      setCurrentValueToModelValue()
    }
    const verifyValue = (
      value: number | string | null | undefined,
      update?: boolean
    ): number | null | undefined => {
      const { max, min, step, precision, stepStrictly, valueOnClear } = props
      if (max! < min!) {
        throwError('InputNumber', 'min should not be greater than max.')
      }
      let newVal: number | string | undefined = Number(value)
      if (isNil(value) || Number.isNaN(newVal)) {
        return null
      }
      if (value === '') {
        if (valueOnClear === null) {
          return null
        }
        newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear
      }
      if (stepStrictly) {
        newVal = toPrecision(Math.round(newVal! / step!) * step!, precision)
        if (newVal !== value) {
          if (update) emit(UPDATE_MODEL_EVENT, newVal)
        }
      }
      if (!isUndefined(precision)) {
        newVal = toPrecision(newVal!, precision)
      }
      if (newVal! > max! || newVal! < min!) {
        newVal = newVal! > max! ? max : min
        if (update) emit(UPDATE_MODEL_EVENT, newVal)
      }
      return newVal
    }
    const setCurrentValue = (
      value: number | string | null | undefined,
      emitChange = true
    ) => {
      // console.warn('setCurrentValue  . ');
      // console.warn('setCurrentValue value is ', value);
      const oldVal = data.curValue?.get()
      const newVal = verifyValue(value)
      if (!emitChange) {
        emit(UPDATE_MODEL_EVENT, newVal)
        return
      }
      if (oldVal === newVal && value) return
      data.userInput.set(null)
      emit(UPDATE_MODEL_EVENT, newVal)
      if (oldVal !== newVal) {
        // console.warn('newVal is ', newVal);
        emit(CHANGE_EVENT, newVal, oldVal)
      }
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err: any) => debugWarn(err))
      }
      // console.warn('newVal is ', newVal);
      data.curValue?.set(newVal)
    }
    const handleInput = (value: string) => {
      // todo 会触发两次，一次是数值，一次是event，第二次导致错误
      // console.error('handleInput  . value is ', value);
      if (!isNumber(value)) return; // add by me
      data.userInput.set(value)
      const newVal = value === '' ? null : Number(value)
      emit(INPUT_EVENT, newVal)
      setCurrentValue(newVal, false)
    }
    const handleInputChange = (value: string) => {
      // console.warn('handleInputChange  . value is ', value)
      const newVal = value !== '' ? Number(value) : ''
      if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
        setCurrentValue(newVal)
      }
      setCurrentValueToModelValue()
      data.userInput.set(newVal)
    }

    const focus = () => {
      input.get()?.focus?.()
    }

    const blur = () => {
      input.get()?.blur?.()
    }

    const handleFocus = (event?: MouseEvent | FocusEvent) => {
      emit('focus', event)
    }

    const handleBlur = (event?: MouseEvent | FocusEvent) => {
      data.userInput.set(null)
      // This is a Firefox-specific problem. When non-numeric content is entered into a numeric input box,
      // the content displayed on the page is not cleared after the value is cleared. #18533
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1398528
      if (isFirefox() && data.curValue?.get() === null && input.get()?.input) {
        input!.get()!.input!.get()!.value = '' // todo
        // input.value.input.value = ''
      }
      emit('blur', event)
      if (props.validateEvent) {
        formItem?.validate?.('blur').catch((err: any) => debugWarn(err))
      }
    }

    const setCurrentValueToModelValue = () => {
      if (data.curValue?.get() !== props.vModel?.get()) {
        // console.warn('props.vModel?.get() is ', props.vModel?.get())
        data.curValue?.set(props.vModel?.get())
      }
    }
    const handleWheel = (e: WheelEvent) => {
      if (document.activeElement === e.target) e.preventDefault()
    }

    watch(
      () => props.vModel?.get(),
      (value, oldValue) => {
        const newValue = verifyValue(value, true)
        // console.warn('newValue is ', newValue);
        if (data.userInput.get() === null && newValue !== oldValue) {
          data.curValue?.set(newValue)
        }
      },
      { immediate: true }
    )
    onMounted(() => {
      const { min, max, vModel: modelValue } = props
      const innerInput = input.get()?.input?.get() as HTMLInputElement
      innerInput.setAttribute('role', 'spinbutton')
      if (Number.isFinite(max)) {
        innerInput.setAttribute('aria-valuemax', String(max))
      } else {
        innerInput.removeAttribute('aria-valuemax')
      }
      if (Number.isFinite(min)) {
        innerInput.setAttribute('aria-valuemin', String(min))
      } else {
        innerInput.removeAttribute('aria-valuemin')
      }
      innerInput.setAttribute(
        'aria-valuenow',
        data.curValue?.get() || data.curValue?.get() === 0
          ? String(data.curValue?.get())
          : ''
      )
      innerInput.setAttribute('aria-disabled', String(inputNumberDisabled.get()))
      if (!isNumber(modelValue?.get()) && modelValue?.get() != null) {
        let val: number | null = Number(modelValue.get())
        if (Number.isNaN(val)) {
          val = null
        }
        // console.warn('val is ', val);
        emit(UPDATE_MODEL_EVENT, val!)
      }
      innerInput.addEventListener('wheel', handleWheel, { passive: false })
    })
    onUpdated(() => {
      const innerInput = input.get()?.input?.get()
      innerInput?.setAttribute('aria-valuenow', `${data.curValue?.get() ?? ''}`)
    })
    defineExpose({
      /** @description get focus the input component */
      focus,
      /** @description remove focus the input component */
      blur,
    })

    this.attr.addClass([
      ns.b(),
      ns.m(inputNumberSize.get()),
      ns.is('disabled', inputNumberDisabled.get()),
      ns.is('without-controls', !props.controls),
      ns.is('controls-right', controlsAtRight.get()),
    ])
    this.addEvents({
      dragstart: (evt) => evt?.preventDefault(),
    })
    this.slotChildren([
      new Span({
        vIf: props.controls,
        // v-repeat-click="decrease"
        class: computed(() => [ns.e('decrease'), ns.is('disabled', minDisabled.get())]),
        attrObj: {
          role: 'button',
          ariaLabel: t('el.inputNumber.decrease'),
        },
        events: {
          keydown: (evt) => {
            if (evt?.code === 'Enter') {
              decrease();
            }
          },
          click: decrease,
        },
        slot: props.slots?.decreaseIcon
          ?? new TdIcon({
            slot: controlsAtRight.get()
              ? new ElArrowDownSvg()
              : new ElMinusSvg(),
          }),
      }),
      new Span({
        vIf: props.controls,
        // v-repeat-click="increase"
        class: computed(() =>[ns.e('increase'), ns.is('disabled', maxDisabled.get())]),
        attrObj: {
          role: 'button',
          ariaLabel: t('el.inputNumber.increase'),
        },
        events: {
          keydown: (evt) => {
            if (evt?.code === 'Enter') {
              increase();
            }
          },
          click: increase,
        },
        slot:
          props.slots?.increaseIcon ??
          new TdIcon({
            slot: controlsAtRight.get() ? new ElArrowUpSvg() : new ElPlusSvg(),
          }),
      }),
      new TdInput({
        refEl: input,
        size: inputNumberSize.get(),
        name: props.name,
        // modelValue: displayValue.get(),
        vModel: displayValue,
        placeholder: props.placeholder,
        readonly: props.readonly,
        disabled: inputNumberDisabled,
        type: 'number',
        validateEvent: false,
        attrObj: {
          id: props.id,
          step: props.step,
          max: props.max,
          min: props.min,
          ariaLabel: props.ariaLabel,
        },
        emits: {
          keydown: (evt) => {
            // console.warn('evt?.key is ', evt?.key)
            if (evt?.key === 'Up') {
              increase();
              evt.preventDefault();
            }
            if (evt?.key === 'Down') {
              decrease();
              evt.preventDefault();
            }
          },
          blur: handleBlur,
          focus: handleFocus,
          input: handleInput,
          change: handleInputChange
        },
        slots: {
          prefix: props.slots?.prefix,
          suffix: props.slots?.suffix,
        }
      }),
    ]);
  }
}
