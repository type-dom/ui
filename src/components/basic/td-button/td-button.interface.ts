import { TypeProps, ITypeHtml, TypeSvgSvg } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { ComponentSize } from '../../../constants';

export interface ITdButtonAbstract extends ITypeHtml {
  // nodeName: 'button',
  className: 'TdButton' | string;
  // childNodes: IXElement[];
}

export interface ITdButton extends ITdButtonAbstract {
  className: 'TdButton';
  props: TdButtonProps;
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
export interface TdButtonProps extends TypeProps {
  // FormItemProps
  svgObj?: TypeSvgSvg;
  // loadingIcon?: TypeSvgSvg;
  // slots?: ITdButtonSlots;
  /**
   * @description button size
   */
  size?: ComponentSize;
  /**
   * @description disable the button
   */
  disabled?: MaybeRef<boolean>;
  /**
   * @description button type
   */
  type?: IButtonType;
  /**
   * @description icon component
   */
  icon?: TypeSvgSvg;
  /**
   * @description native button type
   */
  nativeType?: IButtonNativeType;
  /**
   * @description determine whether it's loading
   */
  loading?: boolean;
  /**
   * @description customize loading icon component
   *     default?: () => Loading;
   */
  loadingIcon?: TypeSvgSvg;
  /**
   * @description determine whether it's a plain button
   */
  plain?: boolean;
  /**
   * @description determine whether it's a text button
   */
  text?: boolean;
  /**
   * @description determine whether it's a link button
   */
  link?: boolean;
  /**
   * @description determine whether the text button background color is always on
   */
  bg?: boolean;
  /**
   * @description native button autofocus
   */
  autofocus?: boolean;
  /**
   * @description determine whether it's a round button
   */
  round?: boolean;
  /**
   * @description determine whether it's a circle button
   */
  circle?: boolean;
  /**
   * @description custom button color; automatically calculate `hover` and `active` color
   */
  color?: string;
  /**
   * @description dark mode; which automatically converts `color` to dark mode colors
   */
  dark?: boolean;
  /**
   * @description automatically insert a space between two chinese characters
   */
  autoInsertSpace?: boolean;
  /**
   * @description custom element tag
   */
  tag?: string;
}
