import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'SvgSvg';
  }
}
