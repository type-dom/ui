import { IUI, IUIConfig } from '../../ui.interface';

export interface ITdText extends IUI {
  className: 'TdText';
}

export interface ITdTextConfig extends IUIConfig {
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
  size?: '' | 'default' | 'small' | 'large';
  /**
   * @description render ellipsis
   */
  truncated?: boolean;
  width?: number | string; // 结合truncated使用;
  /**
   * @description maximum lines
   */
  lineClamp?: number | string;
  /**
   * @description custom element tag
   */
  tag?: 'span' | string; // default span
}

