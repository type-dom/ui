import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { IType } from '../../../styles';

export interface ITdTag extends ITypeFragment {
  className: 'TdTag';
}

export interface TagProps extends TypeFragmentProps {
  /**
   * @description type of Tag
   *     default: 'primary',
   */
  type?: IType; // 'primary' | 'success' | 'info' | 'warning' | 'danger';
  /**
   * @description whether Tag can be removed
   */
  closable?: boolean;
  /**
   * @description whether to disable animations
   */
  disableTransitions?: boolean;
  /**
   * @description whether Tag has a highlighted border
   */
  hit?: boolean;
  /**
   * @description background color of the Tag
   */
  color?: string;
  /**
   * @description size of Tag
   */
  size?: ComponentSize;
  /**
   * @description theme of Tag
   *     default: 'light',
   */
  effect?: 'dark' | 'light' | 'plain';
  /**
   * @description whether Tag is rounded
   */
  round?: boolean;
}
