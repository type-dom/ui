import {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from '@type-dom/async-validator';
import { TypeDivProps, ITypeElement } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { Arrayable } from '../../../../../utils/src/ui/typescript';
import { ComponentSize } from '../../../constants';

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const;
export type IFormItemValidateState = (typeof formItemValidateStates)[number];

export interface ITdFormItem extends ITypeElement {
  className: 'TdFormItem';
}

export type FormItemProp = Arrayable<string>;

export type FormItemValidateState = (typeof formItemValidateStates)[number];

export interface FormItemProps extends TypeDivProps {
  /**
   * @description Label text.
   */
  label?: string;
  /**
   * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
   */
  labelWidth?: string | number;
  /**
   * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
   */
  prop?: FormItemProp;
  //   type: definePropType<FormItemProp>([string, Array]),
  // },
  /**
   * @description Whether the field is required or not, will be determined by validation rules if omitted.
   */
  required?: boolean;
  /**
   * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
   */
  rules?: Arrayable<FormItemRule>;
  //   type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  // },
  /**
   * @description Field error message, set its value and the field will validate error and show this message immediately.
   */
  error?: string;
  /**
   * @description Validation state of formItem.
   */
  validateStatus?: IFormItemValidateState;
  // validateStatus: {
  //   type: string,
  //   values: formItemValidateStates,
  // },
  /**
   * @description Same as for in native label.
   */
  for?: string;
  /**
   * @description Inline style validate message.
   */
  inlineMessage?: string | boolean;
  /**
   * @description Whether to show the error message.
   *     default: true,
   */
  showMessage?: boolean;
  /**
   * @description Control the size of components in this form-item.
   */
  size?: MaybeRef<ComponentSize>;

  contentAlign?: 'left' | 'right' | 'center';
  labelPosition?: ILabelPosition;
}

export type ILabelPosition = '' | 'left' | 'right' | 'top';

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}

export type FormValidationResult = Promise<boolean>;
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => Promise<void> | void;

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
