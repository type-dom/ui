import { ITypeSvg } from '../type-svg.interface';

export interface ITypeSvgSvg extends ITypeSvg {
  nodeName: 'svg',
  childNodes: ITypeSvg[],
}
