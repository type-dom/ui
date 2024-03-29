import { ITypeButton, ISpan, ITypeConfig, TypeSvgSvg } from '@type-dom/framework';
import { ITdIcon } from '../td-icon/td-icon.interface';

export interface ITdButton extends ITypeButton {
  // nodeName: 'button',
  className: 'TdButton',
  childNodes: (ISpan | ITdIcon)[],
}
export type IButtonSize = '' | 'mini' | 'small' | 'middle' | 'large';
export type IButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text' | ''
export type IButtonNativeType = 'button' | 'submit' | 'reset';
/**
 *     type、plain、round 和 circle 来定义按钮的样式。
 *         type: primary/success/warning/danger/info
 *         size: mini/small/middle/large
 *         round,
 *         circle: boolean
 *     使用 icon 属性来为按钮添加图标。
 *         icon: 'Search'
 *     通过设置 loading 属性为 true 来显示加载中状态。
 *     loading-icon  自定义加载中状态图标组件
 *     color 自定义按钮的颜色。
 *     disabled  按钮是否为禁用状态
 */
export interface ITdButtonConfig extends ITypeConfig {
  // FormItemProps
  size: IButtonSize;
  disabled: boolean;
  title: string;
  type: IButtonType;
  SvgClass: any; // todo createSvg(svgName)
  svgObj: TypeSvgSvg;
  iconPosition: 'left' | 'right';
  icon: string;
  nativeType: IButtonNativeType;
  loading: boolean;
  plain: boolean;
  round: boolean;
  circle: boolean;
  loadingIcon: string;
  color: string;
}
