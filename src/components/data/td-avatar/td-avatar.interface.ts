import { Globals } from '@type-dom/css-type';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ISize } from '../../../styles/size';
import { TdIcon } from '../../basic/td-icon/td-icon.class';

export interface ITdAvatar extends IUI {
  className: 'TdAvatar';
}

export interface ITdAvatarConfig extends IUIConfig {
  /**
   * @description avatar size.
   *     default: '',
   */
  size?: number | ISize;
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
