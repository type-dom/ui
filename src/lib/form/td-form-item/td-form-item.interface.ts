import { IUI, IUIConfig } from '../../ui.interface';
import { ISize } from '../../styles/size';
import { TypeNode } from '@type-dom/framework';

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success'
] as const;
export type IFormItemValidateState = typeof formItemValidateStates[number];

export interface ITdFormItem extends IUI {
  className: 'TdFormItem';
}

export interface ITdFormItemConfig extends IUIConfig {
  /**
   * @description Label text.
   */
  label?: string,
  /**
   * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
   */
  labelWidth?: string | number;
  /**
   * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
   */
  // prop: {
  //   type: definePropType<FormItemProp>([string, Array]),
  // },
  /**
   * @description Whether the field is required or not, will be determined by validation rules if omitted.
   */
  required?: boolean;
  /**
   * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
   */
  // rules: {
  //   type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  // },
  /**
   * @description Field error message, set its value and the field will validate error and show this message immediately.
   */
  error?: string,
  /**
   * @description Validation state of formItem.
   */
  validateStatus?: IFormItemValidateState,
  // validateStatus: {
  //   type: string,
  //   values: formItemValidateStates,
  // },
  /**
   * @description Same as for in native label.
   */
  for?: string,
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
  size?: ISize;

  contents?: TypeNode[];
  labelPosition?: ILabelPosition;
}

export type ILabelPosition = 'left' | 'right' | 'top';
