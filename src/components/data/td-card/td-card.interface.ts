import { IStyle } from '@type-dom/css-type';
import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdCard extends ITypeDiv {
  className: 'TdCard';
}

export interface CardProps extends TypeDivProps {
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
