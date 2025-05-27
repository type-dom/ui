import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export interface ITdWatermark extends ITypeDiv {
  className: 'TdWatermark';
}

export interface WatermarkFontType {
  color?: MaybeRef<string>;
  fontSize?: MaybeRef<number | string>;
  fontWeight?: MaybeRef<'normal' | 'light' | 'weight' | number>;
  fontStyle?: MaybeRef<'none' | 'normal' | 'italic' | 'oblique'>;
  fontFamily?: string;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
  textBaseline?:
    | 'top'
    | 'hanging'
    | 'middle'
    | 'alphabetic'
    | 'ideographic'
    | 'bottom';
}

export interface WatermarkProps extends TypeDivProps {
  /**
   * @description The z-index of the appended watermark element
   *     default: 9,
   */
  zIndex?: MaybeRef<number>;
  /**
   * @description The rotation angle of the watermark
   *     default: -22,
   */
  rotate?: MaybeRef<number>;
  /**
   * @description The width of the watermark
   */
  width?: MaybeRef<number>;
  /**
   * @description The height of the watermark
   */
  height?: MaybeRef<number>;
  /**
   * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
   */
  image?: string;
  /**
   * @description Watermark text content
   */
  content?: MaybeRef<string | string[]>;
  /**
   * @description Text style
   */
  font?: WatermarkFontType;
  /**
   * @description The spacing between watermarks
   *     default: () => [100, 100],
   */
  gap?: MaybeRef<[MaybeRef<number>, MaybeRef<number>]>;
  /**
   * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
   */
  offset?: MaybeRef<[MaybeRef<number>, MaybeRef<number>]>;
}
