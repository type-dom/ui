import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdRow extends ITypeDiv {
  className: 'TdRow';
  props: RowProps;
}

export interface RowProps extends TypeDivProps {
  /**
   * @description custom element tag
   *     default: 'div',
   */
  tag?: string;
  /**
   * @description grid spacing
   *     default: 0,
   */
  gutter?: number;
  /**
   * @description horizontal alignment of flex layout
   */
  justify?: RowJustify;
  /**
   * @description vertical alignment of flex layout
   */
  align?: RowAlign;
}

export type RowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type RowAlign = 'top' | 'middle' | 'bottom';
