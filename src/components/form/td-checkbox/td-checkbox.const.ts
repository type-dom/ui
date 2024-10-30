import { UPDATE_MODEL_EVENT } from '../../../constants/event';


export const checkboxProps = {
  /**
   * @description binding value
   *     type: [Number, String, Boolean],
   */
  // modelValue: undefined,
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   *     type: [String, Boolean, Number, Object],
   */
  // label: undefined,
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   *     type: [String, Boolean, Number, Object],
   */
  // value: undefined,
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  // indeterminate: Boolean,
  /**
   * @description whether the Checkbox is disabled
   */
  // disabled: Boolean,
  /**
   * @description if the Checkbox is checked
   */
  // checked: Boolean,
  /**
   * @description native 'name' attribute
   *     type: String,
   */
  // name: undefined,
  /**
   * @description value of the Checkbox if it's checked
   *     type: [String, Number],
   */
  // trueValue: undefined,
  /**
   * @description value of the Checkbox if it's not checked
   *     type: [String, Number],
   */
  // falseValue: undefined,
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   *     type: [String, Number],
   */
  // trueLabel: undefined,
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   *     type: [String, Number],
   */
  // falseLabel: undefined,
  /**
   * @description input id
   *     type: String,
   */
  // id: undefined,
  /**
   * @description whether to add a border around Checkbox
   */
  // border: Boolean,
  /**
   * @description size of the Checkbox
   */
  // size: ISize,
  /**
   * @description input tabindex
   */
  // tabindex: [String, Number],
  /**
   * @description whether to trigger form validation
   *     type: Boolean,
   */
  validateEvent: true,
  // ...useAriaProps(['ariaControls']),
}

// export const checkboxEmits = {
//   [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
//     isString(val) || isNumber(val) || isBoolean(val),
//   change: (val: CheckboxValueType) =>
//     isString(val) || isNumber(val) || isBoolean(val),
// }
