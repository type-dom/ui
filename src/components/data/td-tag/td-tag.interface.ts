import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { IType } from '../../../styles';

export interface ITdTag extends IUI {
  className: 'TdTag';
}

export interface ITdTagConfig extends IUIConfig {
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
  size?: ISize;
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
