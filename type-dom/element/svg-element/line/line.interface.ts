import { ITypeProperty } from '../../../type-element/type-element.interface';
import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
/**
 * x1 属性在 x 轴定义线条的开始
 * y1 属性在 y 轴定义线条的开始
 * x2 属性在 x 轴定义线条的结束
 * y2 属性在 y 轴定义线条的结束
 */
export interface ISvgLineProperty extends ITypeProperty {
  styleObj: {
    stroke: string, // rgb(0,0,0) pink
    strokeWidth: number,
    fillOpacity?: number, // 0.1
    strokeOpacity?: number, // 0.9
    opacity?: number // 0.9
  },
  attrObj: {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  }
}
export interface ISvgLine extends ITypeSvg {
  nodeName: 'line';
  className: 'SvgLine';
  propObj: ISvgLineProperty;
  childNodes: [];
}
