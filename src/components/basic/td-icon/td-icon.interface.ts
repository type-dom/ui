import { ITypeI, TypeIProps } from '@type-dom/framework';

/**
 * 定义了图标的接口，继承自IUI接口。
 * 此接口用于规范图标的属性和行为。
 */
export interface ITdIcon extends ITypeI {
  /**
   * 类名，固定为'TdIcon'，用于在HTML元素上应用样式。
   */
  className: 'TdIcon';
  props: IconProps;
}

/**
 * 定义了图标配置的接口，扩展了IUIConfig接口。
 * 这些配置用于自定义图标的展示方式。
 */
export interface IconProps extends TypeIProps {
  /**
   * 可选。指定图标的大小，可以是字符串（如"20px"）或数字。
   */
  size?: string | number;
  /**
   * 可选。指定图标的颜色，使用字符串表示的颜色值。
   */
  color?: string;
}
