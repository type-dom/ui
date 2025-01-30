import {
  InputEnum,
  ITypeFragment,
  TypeFragmentProps,
  TypeElement,
  TypeSvgSvg,
  TypeNode,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { ComponentSize } from '../../../constants/size';
import { TdInput } from '../../form';
import { MaybeRef, Signal } from '@type-dom/signals';

export interface ITdMessageBox extends ITypeFragment {
  className: 'TdMessageBox';
  props: MessageBoxProps;
}

export interface MessageBoxProps
  extends TypeFragmentProps,
    TdMessageBoxOptions,
    MessageBoxState {
  buttonSize?: ComponentSize;
  modal?: boolean;
  lockScroll?: boolean;
  showClose?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  closeOnHashChange?: boolean;
  center?: boolean;
  draggable?: boolean;
  overflow?: boolean;
  roundButton?: boolean;
  container?: string;
  boxType?: IMessageBoxType;
}

type MessageType = '' | 'success' | 'warning' | 'info' | 'error';

export type IMessageBoxType = '' | 'prompt' | 'alert' | 'confirm';
export type MessageBoxData = IMessageBoxInputData & Action;
export type Action = 'confirm' | 'close' | 'cancel';

export interface IMessageBoxInputData {
  value: string;
  input?: TdInput;
  action?: Action;
}

export interface MessageBoxInputValidator {
  (value?: string | number): boolean | string;
}

export declare interface MessageBoxState {
  autofocus?: boolean;
  title?: string | TdMessageBoxOptions;
  message?: string | TypeNode;
  type?: MessageType;
  icon?: typeof TypeSvgSvg; // | string;
  customClass?: string;
  customStyle?: IStyle;
  showInput?: boolean;
  inputValue?: Signal<string>;
  inputPlaceholder?: string;
  inputType?: keyof typeof InputEnum | 'textarea';
  inputPattern?: RegExp;
  inputValidator?: MessageBoxInputValidator;
  inputErrorMessage?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  action?: Action;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonText?: MaybeRef<string>;
  cancelButtonText?: MaybeRef<string>;
  confirmButtonLoading?: boolean;
  cancelButtonLoading?: boolean;
  confirmButtonLoadingIcon?: TypeSvgSvg;
  cancelButtonLoadingIcon?: TypeSvgSvg;
  confirmButtonClass?: string;
  confirmButtonDisabled?: boolean;
  cancelButtonClass?: string;
  editorErrorMessage?: Signal<string>; // need to reactivity

  beforeClose?: (
    action: Action,
    instance: MessageBoxState,
    done: () => void
  ) => void;
  callback?: Callback;
  distinguishCancelAndClose?: boolean;
  modalFade?: boolean;
  modalClass?: string;
  // refer to?: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
  // seemed ok for now without this state.
  isOnComposition?: false; // temporary remove
  validateError?: boolean;
  zIndex?: number;
}

export type Callback = (action: Action) => void;

/** Options used in MessageBox */
export interface TdMessageBoxOptions {
  /**
   * auto focus when open message-box
   */
  autofocus?: boolean;

  /** Callback before MessageBox closes, and it will prevent MessageBox from closing */
  beforeClose?: (
    action: Action,
    instance: MessageBoxState,
    done: () => void
  ) => void;

  /** Custom class name for MessageBox */
  customClass?: string;

  /** Custom inline style for MessageBox */
  customStyle?: IStyle;

  /** MessageBox closing callback if you don't prefer Promise */
  callback?: Callback;

  /** Text content of cancel button, need to reactivity */
  cancelButtonText?: MaybeRef<string>;

  /** Text content of confirm button,  need to reactivity*/
  confirmButtonText?: MaybeRef<string>;

  /** Loading Icon content of cancel button */
  cancelButtonLoadingIcon?: TypeSvgSvg;

  /** Loading Icon content of confirm button */
  confirmButtonLoadingIcon?: TypeSvgSvg;

  /** Custom class name of cancel button */
  cancelButtonClass?: string;

  /** Custom class name of confirm button */
  confirmButtonClass?: string;

  /** Whether to align the content in center */
  center?: boolean;

  /** Whether MessageBox can be drag */
  draggable?: boolean;

  /** Draggable MessageBox can overflow the viewport */
  overflow?: boolean;

  /** Content of the MessageBox */
  message?: string | TypeNode; //| (() => TypeNode);

  /** Title of the MessageBox */
  title?: string | TdMessageBoxOptions;

  /** Message type, used for icon display */
  type?: MessageType;

  /** Message box type */
  boxType?: IMessageBoxType;

  /** Custom icon component */
  icon?: typeof TypeSvgSvg;

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean;

  /** Whether to distinguish canceling and closing */
  distinguishCancelAndClose?: boolean;

  /** Whether to lock body scroll when MessageBox prompts */
  lockScroll?: boolean;

  /** Whether to show a cancel button */
  showCancelButton?: boolean;

  /** Whether to show a confirm button */
  showConfirmButton?: boolean;

  /** Whether to show a close button */
  showClose?: boolean;

  /** Whether to use round button */
  roundButton?: boolean;

  /** Whether MessageBox can be closed by clicking the mask */
  closeOnClickModal?: boolean;

  /** Whether MessageBox can be closed by pressing the ESC */
  closeOnPressEscape?: boolean;

  /** Whether to close MessageBox when hash changes */
  closeOnHashChange?: boolean;

  /** Whether to show an input */
  showInput?: boolean;

  /** Placeholder of input */
  inputPlaceholder?: string;

  /** Initial value of input */
  inputValue?: Signal<string>;

  /** Regexp for the input */
  inputPattern?: RegExp;

  /** Input Type: text, textArea, password or number */
  inputType?: keyof typeof InputEnum | 'textarea';

  /** Validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage */
  inputValidator?: MessageBoxInputValidator;

  /** Error message when validation fails */
  inputErrorMessage?: string;

  /** Custom size of confirm and cancel buttons */
  buttonSize?: ComponentSize;

  /** Custom element to append the message box to */
  appendTo?: HTMLElement | string;

  // emits?: {
  //   vanish?: (
  //     action?: Action,
  //     instance?: MessageBoxState,
  //     done?: () => void
  //   ) => void;
  //   action?: (action?: Action) => void;
  // };
}

export type TdMessageBoxShortcutMethod = ((
  message: TdMessageBoxOptions['message'],
  options?: TdMessageBoxOptions
  // appContext?: AppContext | null
) => Promise<MessageBoxData>) &
  ((
    message: TdMessageBoxOptions['message'],
    title: TdMessageBoxOptions['title'],
    options?: TdMessageBoxOptions
    // appContext?: AppContext | null
  ) => Promise<MessageBoxData>);

export interface ITdMessageBoxFn {
  // _context: AppContext | null

  /** Show a message box */

  // (message: string, title?: string, type?: string): Promise<MessageBoxData>

  /** Show a message box */
  (
    options: TdMessageBoxOptions
    // appContext?: AppContext | null
  ): Promise<MessageBoxData>;

  /** Show an alert message box */
  alert: TdMessageBoxShortcutMethod;

  /** Show a confirm message box */
  confirm: TdMessageBoxShortcutMethod;

  /** Show a prompt message box */
  prompt: TdMessageBoxShortcutMethod;

  /** Close current message box */
  close(): void;
}
