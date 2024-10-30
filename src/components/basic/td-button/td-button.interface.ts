import { ISpan, TypeElement, TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ITdIcon } from '../td-icon/td-icon.interface';
import { TdButton } from './td-button.class';

export interface ITdButtonAbstract extends IUI {
  // nodeName: 'button',
  className: 'TdButton' | string;
  childNodes: (ISpan | ITdIcon)[];
}

export interface ITdButton extends ITdButtonAbstract {
  className: 'TdButton';
}

export type IButtonSize = 'small' | 'default' | 'large';
export type IButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  | 'text'
  | '';
export type IButtonNativeType = 'button' | 'submit' | 'reset';

/**
 *     type、plain、round 和 circle 来定义按钮的样式。
 *         type: primary/success/warning/danger/info
 *         size: small/default/large
 *         round: boolean
 *         circle: boolean
 *     使用 icon 属性来为按钮添加图标。
 *         icon: 'Search'
 *     通过设置 loading 属性为 true 来显示加载中状态。
 *     loading-icon  自定义加载中状态图标组件
 *     color 自定义按钮的颜色。
 *     disabled  按钮是否为禁用状态
 */
export interface ITdButtonConfig extends IUIConfig {
  // FormItemProps
  size?: IButtonSize;
  disabled?: boolean;
  type?: IButtonType;
  svgObj?: TypeSvgSvg;
  icon?: string;
  nativeType?: IButtonNativeType;
  loading?: boolean;
  loadingIcon?: TypeSvgSvg;
  plain?: boolean;
  text?: boolean; // text type
  link?: boolean;
  round?: boolean;
  bg?: boolean;
  circle?: boolean;
  color?: string;
  // slots?: ITdButtonSlots;
}

// export interface ITdButtonSlots extends IUISlots {
//   loading?: SlotNode;
//   icon?: SlotNode; // 这里不是 TdIcon, 而是 svg
// }
