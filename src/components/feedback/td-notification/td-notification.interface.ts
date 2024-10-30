import { TypeElement, TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export type INotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type INotificationType = 'success' | 'info' | 'warning' | 'error';

export interface ITdNotification extends IUI {
  className: 'TdNotification';
}

export interface ITdNotificationConfig extends IUIConfig {
  /**
   * @description custom class name for Notification
   *     default: ''
   */
  customClass?: string;
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString?: boolean,
  /**
   * @description duration before close. It will not automatically close if set 0
   *     default: 4500
   */
  duration?: number;
  /**
   * @description custom icon component. It will be overridden by `type`
   */
  icon?: TypeSvgSvg;
  /**
   * @description notification dom id
   *     default: ''
   */
  id?: string;
  /**
   * @description description text
   *     default: ''
   */
  message?: string | TypeElement;
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
  zIndex?: number,
}
