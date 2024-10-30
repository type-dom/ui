import { StyleAlignItems, TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdSpace extends IUI {
  className: 'TdSpace';
  horizontalSize?: number;
  verticalSize?: number;
}

export interface ITdSpaceConfig extends IUIConfig {
  /**
   * @description Placement direction	排列的方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description Controls the alignment of items	对齐方式
   * 对应 align-items
   */
  alignment?: StyleAlignItems;
  /**
   * @description Spacer	间隔符
   */
  spacer?: string | number | TypeSvgSvg;
  /**
   * @description Auto wrapping 设置是否自动折行 default: false
   */
  wrap?: boolean;
  /**
   * @description Whether to fill the container	是否填充剩余空间 default: false
   */
  fill?: boolean;
  /**
   * @description Ratio of fill
   */
  fillRatio?: number; //	填充比率 default: 100
  /**
   * Sets the space between each element.
   * 间隔大小
   * 元组：[水平间隔，垂直间隔]；
   */
  size?: number | string | [h: number, v: number];
}
