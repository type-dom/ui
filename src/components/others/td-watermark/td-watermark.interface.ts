import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdWatermark extends ITypeDiv {
  className: 'TdWatermark';
}

export interface WatermarkFontType {
  color?: string;
  fontSize?: number | string;
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
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
  zIndex?: number;
  /**
   * @description The rotation angle of the watermark
   */
  rotate?: number;
  /**
   * @description The width of the watermark
   */
  width?: number;
  /**
   * @description The height of the watermark
   */
  height?: number;
  /**
   * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
   */
  image?: string;
  /**
   * @description Watermark text content
   */
  content?: string | string[];
  /**
   * @description Text style
   */
  font?: WatermarkFontType;
  /**
   * @description The spacing between watermarks
   */
  gap?: [number, number];
  /**
   * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
   */
  offset?: [number, number];
}
