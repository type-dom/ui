import {
  InputEnum,
  ITypeDiv,
  TypeDivProps,
  Span,
  TypeSvgSvg,
} from '@type-dom/framework';
import { Computed, MaybeRef, Ref, Signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { ComponentSize } from '../../../constants/size';
import { TdInput } from './td-input.class';

export interface ITdInput extends ITypeDiv {
  className: 'TdInput';
}

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean;

export interface TdInputProps extends TypeDivProps {
  parent?: TdInput;
  /**
   * @description native input id
   */
  id?: string;
  /**
   * @description input box size
   */
  size?: ComponentSize;
  /**
   * @description whether to disable
   */
  disabled?: MaybeRef<boolean>;
  /**
   * @description binding value
   */
  modelValue?: string | number;
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
  autosize?: InputAutoSize;
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
  placeholder?: string | Signal<string> | Computed<string>;
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
  showWordLimit?: boolean;
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
  label?: string;
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
  inputStyle?: IStyle; // 'input' | 'textarea'; // 不需要
  /**
   * @description native input autofocus
   *     default: false,
   */
  autofocus?: boolean;
  rows?: number;

  vModel?: Ref<string | number | null | undefined>;
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

export type TargetElement = HTMLInputElement | HTMLTextAreaElement;
