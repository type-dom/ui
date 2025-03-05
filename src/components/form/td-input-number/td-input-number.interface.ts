import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';

export interface ITdInputNumber extends ITypeDiv {
  className: 'TdInputNumber';
}

export interface InputNumberProps extends TypeDivProps {
  /**
   * @description same as `id` in native input
   */
  id?: string,
    // default: undefined,
  /**
   * @description incremental step
   */
  step?: number,
    // default: 1,
  /**
   * @description whether input value can only be multiple of step
   */
  stepStrictly?: boolean,
  /**
   * @description the maximum allowed value
   */
  max?: number,
    // default: Number.POSITIVE_INFINITY,
  /**
   * @description the minimum allowed value
   */
  min?: number,
    // default: Number.NEGATIVE_INFINITY,
  /**
   * @description binding value
   */
  modelValue?: number,
  /**
   * @description same as `readonly` in native input
   */
  readonly?: boolean,
  /**
   * @description whether the component is disabled
   */
  disabled?: boolean,
  /**
   * @description size of the component
   */
  size?: ComponentSize; // useSizeProp,
  /**
   * @description whether to enable the control buttons
   */
  controls?: boolean,
    // default: true,
  /**
   * @description position of the control buttons
   */
  controlsPosition?: string,
    // default: '',
    // values: ['', 'right'],

  /**
   * @description value should be set when input box is cleared
   */
  valueOnClear?: string | number | null,
    // validator: (val: 'min' | 'max' | number | null) =>
    //   val === null || isNumber(val) || ['min', 'max'].includes(val),
    // default: null,
  /**
   * @description same as `name` in native input
   */
  name?: string,
  /**
   * @description same as `placeholder` in native input
   */
  placeholder?: string,
  /**
   * @description precision of input value
   */
  precision?: number,
    // validator: (val: number) =>
    //   val >= 0 && val === Number.parseInt(`${val}`, 10),
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean,
    // default: true,
  // ...useAriaProps(['ariaLabel']),
}
