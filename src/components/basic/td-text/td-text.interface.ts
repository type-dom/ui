import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { IType } from '../../../styles';
import { ISize } from '../../../styles/size';

export interface ITdText extends IUI {
  className: 'TdText';
}

export interface ITdTextConfig extends IUIConfig {
  type?: IType; // 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
  size?: ISize; // '' | 'default' | 'small' | 'large';
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
