import { TypeSvg } from '../../../type-element/type-svg/type-svg.abstract';
import { ISvgEllipse, ISvgEllipseProperty } from './ellipse.interface';

export class SvgEllipse extends TypeSvg implements ISvgEllipse {
  nodeName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  propObj: ISvgEllipseProperty;
  childNodes: [];
  cx = 0;
  cy = 0;
  rx = 0;
  ry = 0;

  constructor(public parent: TypeSvg) {
    super('ellipse');
    this.nodeName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.nodeName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        fill: 'rgb(255, 255, 255)',
        stroke: '#000',
        strokeWidth: 1,
      },
      attrObj: {
        cx: this.cx,
        cy: this.cy,
        rx: this.rx,
        ry: this.ry
      }
    };
  }

  reset(cx: string | number, cy: string | number, rx: string | number, ry: string | number): SvgEllipse {
    this.setAttrObj({
      cx,
      cy,
      rx,
      ry
    });
    return this;
  }
}
