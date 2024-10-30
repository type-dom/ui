import { TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TdIcon } from './td-icon.class';

/**
 * 定义了图标的接口，继承自IUI接口。
 * 此接口用于规范图标的属性和行为。
 */
export interface ITdIcon extends IUI {
  /**
   * 类名，固定为'TdIcon'，用于在HTML元素上应用样式。
   */
  className: 'TdIcon';
}

/**
 * 定义了图标配置的接口，扩展了IUIConfig接口。
 * 这些配置用于自定义图标的展示方式。
 */
export interface ITdIconConfig extends IUIConfig {
  /**
   * 可选。指定一个SVG图形对象，用于显示自定义SVG图标。
   */
  svgObj?: TypeSvgSvg;
  /**
   * 可选。指定图标的大小，可以是字符串（如"20px"）或数字。
   */
  size?: string | number;
  /**
   * 可选。指定图标的颜色，使用字符串表示的颜色值。
   */
  color?: string;
  /**
   * 可选。指定图标是否处于加载状态，用于显示加载中的动画效果。
   */
  loading?: boolean;
  /**
   * 可选。指定图标的对齐方式，可以是"left"（左对齐）或"right"（右对齐）。
   */
  position?: 'left' | 'right';
  /**
   * 可选。用于插槽的SVG图形对象，可以替换默认的图标展示。
   */
  slot?: TypeSvgSvg | TdIcon;
}
