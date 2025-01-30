import { IStyle } from '@type-dom/css-type';
import { ITypeDiv, TypeDivProps, TypeDiv } from '@type-dom/framework';
import { TdScrollbar } from './td-scrollbar.class';

export interface ITdScrollbar extends ITypeDiv {
  className: 'TdScrollbar';
}

export interface ITdScrollbarConfig extends TypeDivProps {
  /**
   * @description height of scrollbar
   */
  height?: number | string;
  /**
   * @description max height of scrollbar
   */
  maxHeight?: number | string;
  /**
   * @description whether to use the native scrollbar
   *     default: false,
   */
  native?: boolean;
  /**
   * @description style of wrap
   */
  wrapStyle?: Partial<IStyle>;
  /**
   * @description class of view
   */
  viewClass?: string;
  //   type: [String, Array],
  //   default: '',
  // },
  /**
   * @description style of view
   */
  viewStyle?: Partial<IStyle>;
  // viewStyle: {
  //   type: [String, Array, Object],
  //   default: '',
  // },
  /**
   * @description element tag of the view
   * default: div
   */
  tag?: string;
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize?: boolean; // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description always show
   */
  always?: boolean;
  /**
   * @description minimum size of scrollbar
   */
  minSize?: number; // default 20
  /**
   * @description id of view
   */
  id?: string;
  /**
   * @description role of view
   */
  role?: string;
  /**
   * @description aria-label of view
   */
  ariaLabel?: string;
  /**
   * @description aria-orientation of view
   */
  ariaOrientation?: 'horizontal' | 'vertical';

  // slot?: TypeElement[];
}

export interface ScrollbarContext {
  scrollbarElement: TdScrollbar;
  wrapElement: TypeDiv;
}
