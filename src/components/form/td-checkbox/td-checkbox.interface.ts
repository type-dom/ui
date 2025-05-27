import { TypeProps, ITypeHtml } from '@type-dom/framework';
import { Signal } from '@type-dom/signals';
import { ComponentSize } from '../../../constants/size';

export interface ITdCheckbox extends ITypeHtml {
  className: 'TdCheckbox';
  props: CheckboxProps;
}

export interface CheckboxProps extends TypeProps {
  nodeName?: 'span' | 'label';
  /**
   * @description binding value
   */
  modelValue?: number | string | boolean;
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label?: string | number; // | boolean; // object;
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value?: string | boolean | number | object;
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate?: Signal<boolean | undefined>;
  /**
   * @description whether the Checkbox is disabled
   */
  disabled?: boolean;
  /**
   * @description if the Checkbox is checked
   */
  checked?: boolean;
  /**
   * @description native 'name' attribute
   */
  name?: string;
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue?: string | number;
  /**
   * @description value of the Checkbox if it's not checked
   *     default: undefined,
   */
  falseValue?: string | number;
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   */
  trueLabel?: string | number;
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   */
  falseLabel?: string | number;
  /**
   * @description input id
   */
  id?: string;
  /**
   * @description same as [aria-controls](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls), takes effect when `indeterminate` is `true`
   */
  controls?: string;
  /**
   * @description whether to add a border around Checkbox
   */
  border?: boolean;
  /**
   * @description size of the Checkbox
   */
  size?: ComponentSize;
  /**
   * @description input tabindex
   */
  tabindex?: string | number;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}

export type CheckboxValueType = string | number | boolean | object;
