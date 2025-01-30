import {
  TypeProps,
  ITypeElement,
  ITypeFragment,
  TypeFragmentProps,
  TypeElement,
  TypeSvgSvg,
  TypeNode,
  TypeHtml,
} from '@type-dom/framework';
import { TdNotification } from './td-notification.class';

export type INotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export type INotificationType = 'success' | 'info' | 'warning' | 'error' | '';

export interface ITdNotification extends ITypeFragment {
  className: 'TdNotification';
  props: NotificationProps;
}

export interface NotificationProps extends TypeFragmentProps {
  /**
   * @description custom class name for Notification
   *     default: ''
   */
  customClass?: string;
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * @description duration before close. It will not automatically close if set 0
   *     default: 4500
   */
  duration?: number;
  /**
   * @description custom icon component. It will be overridden by `type`
   */
  icon?: typeof TypeSvgSvg;
  /**
   * @description notification dom id
   *     default: ''
   */
  id?: string;
  /**
   * @description description text
   *     default: ''
   */
  message?: string | TypeNode;
  /**
   * @description offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset
   *     default: 0
   */
  offset?: number;
  /**
   * @description callback function when notification clicked
   *     default: () => undefined
   */
  onClick?: () => void;
  /**
   * @description callback function when closed
   *     required: true
   */
  onClose?: () => void;
  /**
   * @description custom position
   *     default: 'top-right'
   */
  position?: INotificationPosition;
  /**
   * @description whether to show a close button
   *     default: true
   */
  showClose?: boolean;
  /**
   * @description title
   *     default: ''
   */
  title?: string;
  /**
   * @description notification type
   *     default: ''
   */
  type?: INotificationType;
  /**
   * @description initial zIndex
   */
  zIndex?: number;
}

export type NotificationOptions = Omit<NotificationProps, 'id' | 'onClose'> & {
  /**
   * @description set the root element for the notification, default to `document.body`
   */
  appendTo?: HTMLElement | string;
  /**
   * @description callback function when closed
   */
  onClose?(vm: TypeNode): void;
};
export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>;

export interface NotificationHandle {
  close: () => void;
}

export type NotificationParams =
  | Partial<NotificationOptions>
  | string
  | TypeNode;
export type NotificationParamsTyped =
  | Partial<NotificationOptionsTyped>
  | string
  | TypeNode;

export interface NotifyFn {
  (
    options?: NotificationParams
    // appContext?: null | AppContext
  ): NotificationHandle;

  closeAll(): void;

  // _context: AppContext | null
}

export type NotifyTypedFn = (
  options?: NotificationParamsTyped
  // appContext?: null | AppContext
) => NotificationHandle;

export interface Notify extends NotifyFn {
  success: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
  info: NotifyTypedFn;
}

export interface NotificationQueueItem {
  vm: TdNotification;
}

export type NotificationQueue = NotificationQueueItem[];
