import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { SvgSvg } from '../svg/svg.class';
import { ISvgLine, ISvgLineProperty } from './line.interface';

export class SvgLine extends TypeSvg implements ISvgLine {
  nodeName: 'line';
  className: 'SvgLine';
  dom: SVGLineElement;
  propObj: ISvgLineProperty;
  childNodes: [];
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;

  constructor(public parent: SvgSvg) {
    super('line');
    this.nodeName = 'line';
    this.className = 'SvgLine';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        strokeWidth: 1,
        stroke: 'rgb(0, 0, 0)',
      },
      attrObj: {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2
      }
    };
  }

  reset(x1: string | number, y1: string | number, x2: string | number, y2: string | number): SvgLine {
    this.setAttrObj({
      x1,
      y1,
      x2,
      y2
    });
    return this;
  }
}
