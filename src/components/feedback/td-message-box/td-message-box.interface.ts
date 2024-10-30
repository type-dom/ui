import { InputEnum, TypeElement, TypeSvgSvg } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { TdInput } from '../../form';

export interface ITdMessageBox extends IUI {
  className: 'TdMessageBox';
}

type MessageType = '' | 'success' | 'warning' | 'info' | 'error';

export type IMessageBoxType = '' | 'prompt' | 'alert' | 'confirm';
export type MessageBoxData = IMessageBoxInputData & IAction;
export type IAction = 'confirm' | 'close' | 'cancel';
export interface IMessageBoxInputData {
  input?: TdInput;
  action?: IAction;
}

export interface MessageBoxInputValidator {
  (value?: string): boolean | string;
}

export declare interface IMessageBoxState {
  autofocus?: boolean;
  title?: string;
  message?: string;
  type?: MessageType;
  icon?: TypeSvgSvg;
  customClass?: string;
  customStyle?: IStyle;
  showInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
  inputType?: string;
  inputPattern?: RegExp;
  inputValidator?: MessageBoxInputValidator;
  inputErrorMessage?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  action?: IAction;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonLoading?: boolean;
  cancelButtonLoading?: boolean;
  confirmButtonLoadingIcon?: TypeSvgSvg;
  cancelButtonLoadingIcon?: TypeSvgSvg;
  confirmButtonClass?: string;
  confirmButtonDisabled?: boolean;
  cancelButtonClass?: string;
  editorErrorMessage?: string;

  beforeClose?: (
    action: IAction,
    instance: IMessageBoxState,
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

export type Callback = (action: IAction) => void;

export interface ITdMessageBoxConfig extends IUIConfig {
  /**
   * auto focus when open message-box
   */
  autofocus?: boolean;

  /** Callback before MessageBox closes, and it will prevent MessageBox from closing */
  beforeClose?: (
    action: IAction,
    instance: IMessageBoxState,
    done: () => void
  ) => void;

  /** Custom class name for MessageBox */
  customClass?: string;

  /** Custom inline style for MessageBox */
  customStyle?: IStyle;

  /** MessageBox closing callback if you don't prefer Promise */
  callback?: Callback;

  /** Text content of cancel button */
  cancelButtonText?: string;

  /** Text content of confirm button */
  confirmButtonText?: string;

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
  message?: string | TypeElement | (() => TypeElement);

  /** Title of the MessageBox */
  title?: string; // | ElMessageBoxOptions

  /** Message type, used for icon display */
  type?: MessageType;

  /** Message box type */
  boxType?: IMessageBoxType;

  /** Custom icon component */
  icon?: TypeSvgSvg;

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
  inputValue?: string;

  /** Regexp for the input */
  inputPattern?: RegExp;

  /** Input Type: text, textArea, password or number */
  inputType?: keyof typeof InputEnum | 'textarea';

  /** Validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage */
  inputValidator?: MessageBoxInputValidator;

  /** Error message when validation fails */
  inputErrorMessage?: string;

  /** Custom size of confirm and cancel buttons */
  buttonSize?: ISize;

  /** Custom element to append the message box to */
  appendTo?: HTMLElement | string;

  emits?: {
    vanish?: (
      action?: IAction,
      instance?: IMessageBoxState,
      done?: () => void
    ) => void;
    action?: (action?: IAction) => void;
  };
}
