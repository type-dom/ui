import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { ITdFormItemConfig } from '../td-form-item/td-form-item.interface';

export interface ITdForm extends IUI {
  className: 'TdForm';
}

export interface IFormRule {
  required?: boolean;
  validator?: (rule: any, value: any, callback: any) => boolean;
  trigger?: string;
  message?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
//   todo 自定义的验证规则
}

export interface IFormRules {
  [propName: string]: IFormRule[];
}

export interface ITdFormConfig extends IUIConfig {
  /**
   * @description Control the size of components in this form.
   */
  size?: ISize;
  /**
   * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
   */
  disabled?: boolean,
  /**
   * @description Data of form component.
   */
  model?: object,
  /**
   * @description Validation rules of form.
   */
  rules?: IFormRules,
  // rules?: {
  //   type: definePropType<FormRules>(object),
  // },
  /**
   * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.
   *     default: 'right',
   */
  labelPosition?: 'left' | 'right' | 'top';
  /**
   * @description Position of asterisk.
   *     default: 'left'
   */
  requireAsteriskPosition?: 'left' | 'right';
  /**
   * @description Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.
   *     default: '',
   */
  labelWidth?: string | number;
  /**
   * @description Suffix of the label.
   *     default: '',
   */
  labelSuffix?: string;
  /**
   * @description Whether the form is inline.
   */
  inline?: boolean;
  /**
   * @description Whether to display the error message inline with the form item.
   */
  inlineMessage?: boolean;
  /**
   * @description Whether to display an icon indicating the validation result.
   */
  statusIcon?: boolean;
  /**
   * @description Whether to show the error message.
   *     default: true,
   */
  showMessage?: boolean;
  /**
   * @description Whether to trigger validation when the `rules` prop is changed.
   *     default: true,
   */
  validateOnRuleChange?: boolean;
  /**
   * @description Whether to hide required fields should have a red asterisk (star) beside their labels.
   */
  hideRequiredAsterisk?: boolean;
  /**
   * @description When validation fails, scroll to the first error form entry.
   */
  scrollToError?: boolean;
  /**
   * @description When validation fails, it scrolls to the first error item based on the scrollIntoView option.
   */
  scrollIntoViewOptions?: object | boolean;

  options?: Array<ITdFormItemConfig>
}
