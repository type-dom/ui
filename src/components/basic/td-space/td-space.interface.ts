import {
  ITypeDiv,
  TypeDivProps,
  TypeNode,
} from '@type-dom/framework';
import { Property } from '@type-dom/css-type';
import { MaybeRef } from '@type-dom/signals';
import { ComponentSize } from '../../../constants';

export interface ITdSpace extends ITypeDiv {
  className: 'TdSpace';
  horizontalSize?: number;
  verticalSize?: number;
}

export interface SpaceProps extends TypeDivProps {
  /**
   * @description Placement direction	排列的方向
   */
  direction?: MaybeRef<'horizontal' | 'vertical'>;
  /**
   * @description Classname
   */
  // class?: ClassValue;
  /**
   * @description Controls the alignment of items	对齐方式
   * 对应 align-items
   */
  alignment?: Property.AlignItems;

  /**
   * @description Prefix for space-items
   */
  prefixCls?: string;
  /**
   * @description Spacer	间隔符
   */
  spacer?: string | number | TypeNode;
  /**
   * @description Auto wrapping 设置是否自动折行 default: false
   */
  wrap?: boolean;
  /**
   * @description Whether to fill the container	是否填充剩余空间 default: false
   */
  fill?: MaybeRef<boolean>;
  /**
   * @description Ratio of fill
   * 填充比率 default: 100
   */
  fillRatio?: MaybeRef<number>; //
  /**
   * Sets the space between each element.
   * 间隔大小
   * 元组：[水平间隔，垂直间隔]；
   */
  size?: MaybeRef<number | ComponentSize | string | [h: number, v: number]>;
}
