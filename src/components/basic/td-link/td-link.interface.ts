import { ITypeConfig } from '@type-dom/framework';
import { TdIcon } from '@type-dom/ui';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdLink extends IUI {
  className: 'TdLink';
}

export interface ITdLinkConfig extends IUIConfig {
  title?: string; // 文本内容
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default';
  /**
   * @description whether the component has underline
   */
  underline?: boolean;
  /**
   * @description whether the component is disabled
   */
  disabled?: boolean;
  /**
   * @description same as native hyperlink's `href`
   */
  href?: string;
  /**
   * @description same as native hyperlink's `target`
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | string;
  /**
   * @description icon component
   */
  icon?: TdIcon;
  /**
   * @description icon position 默认 right
   */
  iconPosition?: 'left' | 'right';
}
