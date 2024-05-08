import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdCol extends IUI {
  className: 'TdCol';
}

export interface ITdColConfig extends IUIConfig {
  /**
   * @description custom element tag
   */
  tag?: string; // div
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
  xs?: number;
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm?: number;
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md?: number;
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg?: number;
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl?: number;
}
