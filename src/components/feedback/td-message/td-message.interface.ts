import { isClient, Mutable } from '@type-dom/utils';
import {
  ITypeFragment,
  TypeFragmentProps,
  TypeElement,
  TypeSvgSvg,
  TypeNode,
} from '@type-dom/framework';
import { MessageClass } from './td-message.class';
import { Signal } from '@type-dom/signals';

export interface ITdMessage extends ITypeFragment {
  className: 'TdMessage';
  props: MessageProps;
}

export type IMessageType = 'success' | 'info' | 'warning' | 'error';

export interface MessageProps extends TypeFragmentProps {
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
  icon?: typeof TypeSvgSvg;
  /**
   * @description message dom id
   *     default: messageDefaults.id,
   */
  id?: string;
  /**
   * @description message text
   *     default: messageDefaults.message,
   */
  message?: string | TypeNode;
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
  type?: IMessageType;
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
  repeatNum?: Signal<number>;

  appendTo?: HTMLElement;
  // emits?: {
  //   unmount?: () => void;
  // }
}

export type MessageOptions = Partial<
  Omit<MessageProps, 'id'> & {
    appendTo?: HTMLElement | string;
  }
>;
export type MessageParams = MessageOptions | MessageOptions['message'];
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  /**
   * @description set the root element for the message, default to `document.body`
   */
  appendTo: HTMLElement;
};
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>;
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message'];

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void;
}

export type MessageFn = {
  (options?: MessageParams): MessageHandler;
  closeAll(type?: IMessageType): void;
};
export type MessageTypedFn = (
  options?: MessageParamsWithType
) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}

export type MessageContext = {
  id: string;
  vnode: MessageClass;
  handler: MessageHandler;
  // vm: TypeNode;
  props: MessageProps;
};

export interface MessageConfigContext {
  max?: number;
  grouping?: boolean;
  duration?: number;
  offset?: number;
  showClose?: boolean;
}
