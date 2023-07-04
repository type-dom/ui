import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgSvg } from '../svg/svg.class';
import { ISvgCircle } from './circle.interface';

export class SvgCircle extends TypeSvg implements ISvgCircle {
  nodeName: 'circle';
  className: 'SvgCircle';
  dom: SVGCircleElement;
  childNodes: [];
  constructor(public parent: SvgSvg) {
    super('circle');
    this.nodeName = 'circle';
    this.className = 'SvgCircle';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
  }
}
