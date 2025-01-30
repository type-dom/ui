import { isBoolean } from '@type-dom/utils';
import { ITypeElement, TypeFragmentProps } from '@type-dom/framework';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { DialogContentProps } from '../td-dialog-content/td-dialog-content.interface';

export interface ITdDialog extends ITypeElement {
  className: 'TdDialog';
}

type DoneFn = (cancel?: boolean) => void;
export type DialogBeforeCloseFn = (done: DoneFn) => void;

export interface DialogProps
  extends TypeFragmentProps,
    Omit<DialogContentProps, 'nodeName' | 'slots'> {
  /**
   * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
   */
  appendToBody?: boolean;
  /**
   * @description which element the Dialog appends to
   *     default: 'body',
   */
  appendTo?: string;
  //   type: definePropType<string>(String),
  // },
  /**
   * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
   */
  beforeClose?: DialogBeforeCloseFn;
  //   type: definePropType<DialogBeforeCloseFn>(Function),
  // },
  /**
   * @description destroy elements in Dialog when closed
   */
  destroyOnClose?: boolean;
  /**
   * @description whether the Dialog can be closed by clicking the mask
   *     default: true,
   */
  closeOnClickModal?: boolean;
  /**
   * @description whether the Dialog can be closed by pressing ESC
   *     default: true,
   */
  closeOnPressEscape?: boolean;
  /**
   * @description whether scroll of body is disabled while Dialog is displayed
   *     default: true,
   */
  lockScroll?: boolean;
  /**
   * @description whether a mask is displayed
   *     default: true,
   */
  modal?: boolean;
  /**
   * @description the Time(milliseconds) before open
   *     default: 0,
   */
  openDelay?: number;
  /**
   * @description the Time(milliseconds) before close
   *     default: 0,
   */
  closeDelay?: number;
  /**
   * @description value for `margin-top` of Dialog CSS, default is 15vh
   */
  top?: string;
  /**
   * @description visibility of Dialog
   */
  modelValue?: boolean;
  /**
   * @description custom class names for mask
   */
  modalClass?: string;
  /**
   * @description width of Dialog, default is 50%
   */
  width?: string | number;
  /**
   * @description same as z-index in native CSS, z-order of dialog
   */
  zIndex?: number;

  trapFocus?: boolean; // default: false,
  /**
   * @description header's aria-level attribute
   *     default: '2',
   */
  headerAriaLevel?: string;
}
