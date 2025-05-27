import { ITypeForm, TypeFormProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { Arrayable } from '@type-dom/utils';
import { ComponentSize } from '../../../constants';
import {
  FormItemProp,
  FormItemProps,
  IFormItemValidateState,
  ITdFormItem,
} from '../td-form-item/td-form-item.interface';
import { TdFormItem } from '../td-form-item/td-form-item.class';
import type { useFormLabelWidth } from './utils';

export interface ITdForm extends ITypeForm {
  className: 'TdForm';
  childNodes: ITdFormItem[];
}

export interface FormRule {
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

export interface FormRules {
  [propName: string]: FormRule[];
}

export interface FormMetaProps {
  /**
   * @description Control the size of components in this form.
   */
  size?: ComponentSize;
  /**
   * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
   */
  disabled?: MaybeRef<boolean | undefined>;
}

export interface FormProps extends FormMetaProps, TypeFormProps {
  /**
   * @description Data of form component.
   */
  model?: object;
  /**
   * @description Validation rules of form.
   */
  rules?: FormRules;
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
   *     default: true,
   */
  scrollIntoViewOptions?: object | boolean;

  options?: Array<FormItemProps>;
  slot?: Array<TdFormItem>;
}

export interface ValidateError {
  message?: string;
  fieldValue?: any;
  field?: string;
}


export type FormLabelWidthContext = ReturnType<typeof useFormLabelWidth>;

export type ValidateFieldsError = Record<string, ValidateError[]>;
export type FormValidationResult = Promise<boolean>;
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => Promise<void> | void;

export type FormContext = FormProps &
  FormLabelWidthContext & {
    emit: any; // SetupContext<FormEmits>['emit']
    getField: (prop: string) => FormItemContext | undefined;
    addField: (field: FormItemContext) => void;
    removeField: (field: FormItemContext) => void;
    resetFields: (props?: Arrayable<FormItemProp>) => void;
    clearValidate: (props?: Arrayable<FormItemProp>) => void;
    validateField: (
      props?: Arrayable<FormItemProp>,
      callback?: FormValidateCallback
    ) => FormValidationResult;
  };

export interface FormItemContext extends FormItemProps {
  $el: MaybeRef<HTMLDivElement | undefined>;
  size: MaybeRef<ComponentSize>;
  validateState: MaybeRef<IFormItemValidateState>;
  isGroup: MaybeRef<boolean>;
  labelId: string;
  inputIds: MaybeRef<string[]>;
  hasLabel: MaybeRef<boolean>;
  fieldValue: any;
  addInputId: (id: string) => void;
  removeInputId: (id: string) => void;
  validate: (
    trigger: string,
    callback?: FormValidateCallback
  ) => FormValidationResult;

  resetField(): void;

  clearValidate(): void;
}
