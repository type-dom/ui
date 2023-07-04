import { ITypeProperty } from '../../../type-element/type-element.interface';
import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
/**
 * width 和 height 属性可定义矩形的高度和宽度
 * x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
 * y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
 * rx 和 ry 属性可使矩形产生圆角。
 * style 属性用来定义 CSS 属性
 * CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
 * CSS 的 stroke-width 属性定义矩形边框的宽度
 * CSS 的 stroke 属性定义矩形边框的颜色
 * CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
 * CSS 的 stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）
 * CSS 的 opacity 属性定义整个元素的透明值（合法的范围是：0 - 1）
 */
export interface ISvgRectProperty extends ITypeProperty {
  styleObj: {
    fill: string, // rgb(0,0,255) blue
    strokeWidth: number,
    stroke: string, // rgb(0,0,0) pink
    fillOpacity?: number, // 0.1
    strokeOpacity?: number, // 0.9
    opacity?: number, // 0.9
  },
  attrObj: {
    x?: number,
    y?: number,
    rx?: number,
    ry?: number,
    width: number,
    height: number, // px
  }
}
export interface ISvgRect extends ITypeSvg {
  nodeName: 'rect';
  className: 'SvgRect';
  propObj: ISvgRectProperty;
  childNodes: [];
}
