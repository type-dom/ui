import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { IStyle } from '@type-dom/css-type';

export interface ITdCard extends IUI {
  className: 'TdCard';
}

export interface ITdCardConfig extends IUIConfig {
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   *     default: '',
   */
  header?: string;
  // default: '',
  footer?: string;
  /**
   * @description CSS style of card body
   */
  bodyStyle?: IStyle;
  /**
   * @description custom class name of card body
   */
  bodyClass?: string;
  /**
   * @description when to show card shadows
   *     default: 'always',
   */
  shadow?: 'always' | 'hover' | 'never';
}
