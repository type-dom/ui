import { isClient } from '@type-dom/utils';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TypeElement, TypeSvgSvg } from '@type-dom/framework';

export interface ITdMessage extends IUI {
  className: 'TdMessage';
}

export const messageDefaults = {
  customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  plain: false,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never)
} as const;

export type IMessageTypes = 'success' | 'info' | 'warning' | 'error';

export interface ITdMessageConfig extends IUIConfig {
  /**
   * @description custom class name for Message
   *     default: messageDefaults.customClass,
   */
  customClass?: string;
  /**
   * @description whether to center the text
   *     default: messageDefaults.center,
   */
  center?: boolean;
  /**
   * @description whether `message` is treated as HTML string
   *     default: messageDefaults.dangerouslyUseHTMLString,
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   *     default: messageDefaults.duration,
   */
  duration?: number;
  /**
   * @description custom icon component, overrides `type`
   *     default: messageDefaults.icon,
   */
  icon?: TypeSvgSvg,
  /**
   * @description message dom id
   *     default: messageDefaults.id,
   */
  id?: string;
  /**
   * @description message text
   *     default: messageDefaults.message,
   */
  message?: string | TypeElement;
  /**
   * @description callback function when closed with the message instance as the parameter
   *     default: messageDefaults.onClose,
   */
  onClose?: () => void;
  /**
   * @description whether to show a close button
   *     default: messageDefaults.showClose,
   */
  showClose?: boolean;
  /**
   * @description message type
   *     default: messageDefaults.type,
   */
  type?: IMessageTypes;
  /**
   * @description whether message is plain
   *     default: messageDefaults.plain,
   */
  plain?: boolean;
  /**
   * @description set the distance to the top of viewport
   *     default: messageDefaults.offset,
   */
  offset?: number;
  /**
   * @description input box size
   *     default: messageDefaults.zIndex
   */
  zIndex?: number;
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   *     default: messageDefaults.grouping,
   */
  grouping?: boolean;
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   *     default: messageDefaults.repeatNum
   */
  repeatNum?: number;


  appendTo?: HTMLBodyElement;
  emits?: {
    destroy?: () => void;
  }
}
