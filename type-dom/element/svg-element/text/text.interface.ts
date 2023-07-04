/**
 * <text x="10"  y="20"
 * style="font-family: Times New Roman;
 * font-size  : 24;
 * stroke     : #00ff00;
 * fill       : #0000ff;">
 * SVG text styling
 * </text>
 * transform="rotate(30 20,40)"
 */
import { ITextNode } from '../../../text-node/text-node.interface';
import { ITypeElement, ITypeProperty } from '../../../type-element/type-element.interface';
export interface ISvgTextProperty extends ITypeProperty {
  styleObj: {
    fontFamily?: string, // rgb(0,0,255) blue
    fontSize?: string,
    stroke?: string, // rgb(0,0,0) pink
    fill?: string, // #0000ff;"
  },
  attrObj: {
    x: number,
    y: number,
    dx?: number,
    dy?: number,
    transform?: string,
  }
}
export interface ISvgText extends ITypeElement {
  nodeName: 'text',
  propObj: ISvgTextProperty,
  className: 'SvgText',
  childNodes: ITextNode[]
}
