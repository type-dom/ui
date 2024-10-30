import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TdIcon } from '../td-icon/td-icon.class';

export interface ITdLink extends IUI {
  className: 'TdLink';
}

export type ITdLinkType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger';

export interface ITdLinkConfig extends IUIConfig {
  title?: string; // 文本内容
  /**
   * @description type
   *   default: 'default',
   */
  type?: ITdLinkType;
  /**
   * @description whether the component has underline
   *     default: true,
   */
  underline?: boolean;
  /**
   * @description whether the component is disabled
   *  default: false
   */
  disabled?: boolean;
  /**
   * @description same as native hyperlink's `href`
   *  default: ''
   */
  href?: string;
  /**
   * @description same as native hyperlink's `target`
   *     default: '_self',
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | string;
  /**
   * @description icon component
   */
  icon?: TdIcon;

  emits?: {
    click?: (event: MouseEvent) => void;
  };
}
