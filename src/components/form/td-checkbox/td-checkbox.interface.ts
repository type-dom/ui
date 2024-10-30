import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { IJsonData, XProxy } from '@type-dom/framework';

export interface ITdCheckbox extends IUI {
  className: 'TdCheckbox';
}

export interface ITdCheckboxConfig extends IUIConfig {
  /**
   * @description binding value
   */
  modelValue?: number | string | boolean;
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label?: string | number; // | XProxy<IJsonData>;
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value?: string | boolean | number | object;
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate?: boolean;
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
  size?: ISize;
  /**
   * @description input tabindex
   */
  tabindex?: string | number;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}

export type CheckboxValueType = string | number | boolean;
