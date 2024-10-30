import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { TdCheckbox } from '../td-checkbox/td-checkbox.class';
import { CheckboxValueType } from '../td-checkbox/td-checkbox.interface';

export interface ITdCheckboxGroup extends IUI {
  className: 'TdCheckboxGroup';
}

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export interface ITdCheckboxGroupConfig extends IUIConfig {
  /**
   * @description binding value
   */
  modelValue: (string | boolean | number | undefined | object)[];
  // modelValue: { // todo 选项的值的集合类型
  //   type: definePropType<CheckboxGroupValueType>(Array),
  //   default: () => [],
  // },
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled?: boolean;
  /**
   * @description minimum number of checkbox checked
   */
  min?: number;
  /**
   * @description maximum number of checkbox checked
   */
  max?: number;
  /**
   * @description size of checkbox
   */
  size?: ISize;
  /**
   * @description label for screen reader
   */
  label?: string;
  /**
   * @description border and background color when button is active
   */
  fill?: string;
  /**
   * @description font color when button is active
   */
  textColor?: string;
  /**
   * @description element tag of the checkbox group
   *     default: 'div',
   */
  tag?: string;
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean;

  slot?: TdCheckbox[];
}
