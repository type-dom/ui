import { IStyle } from '@type-dom/css-type';
import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export interface ITdBadge extends ITypeDiv {
  className: 'TdBadge';
  props: BadgeProps;
}

export interface BadgeProps extends TypeDivProps {
  /**
   * @description display value.
   *     default: '',
   */
  value?: MaybeRef<string | number>;
  /**
   * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   *     default: 99,
   */
  max?: number;
  /**
   * @description if a little dot is displayed.
   */
  isDot?: boolean;
  /**
   * @description hidden badge.
   */
  hidden?: boolean;
  /**
   * @description badge type.
   *     default: 'danger',
   */
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  /**
   * @description whether to show badge when value is zero.
   *     default: true,
   */
  showZero?: boolean;
  /**
   * @description customize dot background color
   */
  color?: string;
  /**
   * @description CSS style of badge
   */
  badgeStyle?: IStyle;
  /**
   * @description CSS style of dot
   */
  dotStyle?: IStyle;
  /**
   * @description set offset of the badge dot
   *     default: [0, 0],
   */
  offset?: [number, number];
  /**
   * @description custom class name of badge dot
   */
  dotClass?: string;
  /**
   * @description custom class name of badge
   */
  badgeClass?: string;
}
