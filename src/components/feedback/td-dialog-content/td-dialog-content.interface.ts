import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { TdIcon } from '../../basic/td-icon/td-icon.class';

export interface ITdDialogContent extends ITypeDiv {
  className: 'TdDialogContent';
}

export interface DialogContentProps extends TypeDivProps {
  /**
   * @description whether to align the header and footer in center
   */
  center?: boolean;
  /**
   * @description whether to align the dialog both horizontally and vertically
   */
  alignCenter?: boolean;
  /**
   * @description custom close icon, default is Close
   */
  closeIcon?: TdIcon;
  /**
   * @description enable dragging feature for Dialog
   */
  draggable?: MaybeRef<boolean | undefined>;
  /**
   * @description draggable Dialog can overflow the viewport
   */
  overflow?: boolean;
  /**
   * @description whether the Dialog takes up full screen
   */
  fullscreen?: boolean;
  /**
   * @description custom class names for header wrapper
   */
  headerClass?: string;
  /**
   * @description custom class names for body wrapper
   */
  bodyClass?: string;
  /**
   * @description custom class names for footer wrapper
   */
  footerClass?: string;
  /**
   * @description whether to show a close button
   *     default: true,
   */
  showClose?: boolean;
  /**
   * @description title of Dialog. Can also be passed with a named slot (see the following table)
   *     default: '',
   */
  title?: string;
  /**
   * @description header's aria-level attribute
   *     default: '2',
   */
  ariaLevel?: string;

  // slots?: {
  //   // header?: TypeHtml;
  //   footer?: TypeHtml;
  // }
}
