import {
  IJsonData, IJsonDataProp,
  InputEnum,
  IObDataProp, IPrimitive,
  Span,
  TypeSvgSvg, XProxy
} from '@type-dom/framework';
import { ISize } from '../../../styles/size';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TdInput } from './td-input.class';

export interface ITdInput extends IUI {
  className: 'TdInput';
}

export interface ITdInputConfig extends IUIConfig {
  parent?: TdInput;
  /**
   * @description native input id
   */
  id?: string;
  /**
   * @description input box size
   */
  size?: ISize;
  /**
   * @description whether to disable
   */
  disabled?: boolean;
  /**
   * @description binding value
   */
  modelValue?: IJsonDataProp; // IObDataProp;
  /**
   * @description same as `maxlength` in native input
   */
  maxlength?: string | number;
  /**
   * @description same as `minlength` in native input
   */
  minlength?: string | number;
  /**
   * @description type of input
   * default text
   */
  type?: keyof typeof InputEnum | 'textarea'; // 'text' button number
  /**
   * @description control the resizability
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /**
   * @description whether textarea has an adaptive height
   *     default: false,
   */
  autosize?: boolean;
  /**
   * @description native input autocomplete
   *     default: 'off',
   */
  autocomplete?: string;
  /**
   * @description format content
   */
  formatter?: (value: string) => string;
  /**
   * @description parse content
   */
  parser?: (value: string) => string;
  /**
   * @description placeholder
   */
  placeholder?: IObDataProp;
  /**
   * @description native input form
   */
  form?: string;
  /**
   * @description native input readonly
   *     default: false,
   */
  readonly?: boolean;
  /**
   * @description native input readonly
   *     default: false,
   */
  clearable?: boolean;
  /**
   * @description toggleable password input
   *     default: false,
   */
  showPassword?: boolean;
  /**
   * @description word count
   *     default: false,
   */
  showWordLimit?: boolean,
  /**
   * @description suffix icon
   */
  suffixIcon?: TypeSvgSvg;
  /**
   * @description prefix icon
   */
  prefixIcon?: TypeSvgSvg;
  /**
   * @description container role, internal properties provided for use by the picker component
   *     default: undefined,
   */
  containerRole?: string;
  /**
   * @description native input aria-label
   *     default: undefined,
   */
  label?: string
  /**
   * @description input tabindex
   *     default: 0,
   */
  tabindex?: string | number;
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean;
  /**
   * @description input or textarea element style
   */
  // inputStyle?: 'input' | 'textarea'; 不需要
  /**
   * @description native input autofocus
   *     default: false,
   */
  autofocus?: boolean;
  // $slot
  prepend?: boolean;
  append?: boolean;
  // 前缀
  prefix?: Span;
  // 后缀
  suffixVisible?: boolean;
  // 密码是否可见
  passwordVisible?: boolean;
  width?: number;
  suffix?: Span;
}

export type TargetElement = HTMLInputElement | HTMLTextAreaElement
