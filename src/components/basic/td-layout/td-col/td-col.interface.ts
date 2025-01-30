import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdCol extends ITypeDiv {
  className: 'TdCol';
  props: ColProps;
}

export type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};
export type ColSize = number | ColSizeObject;

export interface ColProps extends TypeDivProps {
  /**
   * @description number of column the grid spans
   */
  span?: number; // 24
  /**
   * @description number of spacing on the left side of the grid
   */
  offset?: number;
  /**
   * @description number of columns that grid moves to the left
   */
  pull?: number;
  /**
   * @description number of columns that grid moves to the right
   */
  push?: number;
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs?: ColSize;
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm?: ColSize;
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md?: ColSize;
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg?: ColSize;
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl?: ColSize;
}
