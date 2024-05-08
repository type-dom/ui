import { IStyle } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdScrollbar extends IUI {
  className: 'TdScrollbar';
}

export interface ITdScrollbarConfig extends IUIConfig {
  /**
   * @description height of scrollbar
   */
  height?: number | string;
  /**
   * @description max height of scrollbar
   */
  maxHeight: number | string;
  /**
   * @description whether to use the native scrollbar
   */
  native: boolean;
  /**
   * @description style of wrap
   */
  wrapStyle: Partial<IStyle>;

  /**
   * @description element tag of the view
   */
  tag: string;
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description always show
   */
  always: boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: number; // default 20
  /**
   * @description id of view
   */
  id: string;
  /**
   * @description role of view
   */
  role: string;
  /**
   * @description aria-label of view
   */
  ariaLabel: string;
  /**
   * @description aria-orientation of view
   */
  ariaOrientation: 'horizontal' | 'vertical';

}

// export const scrollbarProps = buildProps({
//
//   /**
//    * @description class of view
//    */
//   viewClass: {
//     type: [String, Array],
//     default: '',
//   },
//   /**
//    * @description style of view
//    */
//   viewStyle: {
//     type: [String, Array, Object],
//     default: '',
//   },
// } as const)
