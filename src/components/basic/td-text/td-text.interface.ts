import { TypeProps, ITypeHtml } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { IType } from '../../../styles';

export interface ITdText extends ITypeHtml {
  className: 'TdText';
}

export interface ITdTextConfig extends TypeProps {
  type?: IType; // 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
  size?: ComponentSize; // '' | 'default' | 'small' | 'large';
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
