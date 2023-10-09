import { ITypeI, TypeSvg } from 'type-dom.ts';
export interface ITdIcon extends ITypeI {
  className: 'TdIcon',
}
export interface ITdIconConfig {
  SvgClass: any, // todo string to createSvg(svgName)
  size: string,
  color: string,
  loading: boolean,
  position: 'left' | 'right',
}
