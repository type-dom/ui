import { Globals } from '@type-dom/css-type';
import { ITypeSpan, TypeSpanProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { TdIcon } from '../../basic/td-icon/td-icon.class';

export interface ITdAvatar extends ITypeSpan {
  className: 'TdAvatar';
  props: AvatarProps;
}

export interface AvatarProps extends TypeSpanProps {
  /**
   * @description avatar size.
   *     default: '',
   */
  size?: number | ComponentSize;
  //   {
  //   type: [Number, String],
  //   values: componentSizes,
  //   validator: (val: unknown): val is number => isNumber(val),
  // },
  /**
   * @description avatar shape.
   *     default: 'circle',
   */
  shape?: 'circle' | 'square';
  /**
   * @description representation type to icon, more info on icon component.
   */
  icon?: TdIcon;
  /**
   * @description the source of the image for an image avatar.
   *     default: '',
   */
  src?: string;
  /**
   * @description native attribute `alt` of image avatar.
   */
  alt?: string;
  /**
   * @description native attribute srcset of image avatar.
   */
  srcSet?: string;
  /**
   * @description set how the image fit its container for an image avatar.
   *     default: 'cover',
   */
  fit?: Globals | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
