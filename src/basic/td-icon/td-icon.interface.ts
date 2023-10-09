import { ITypeI, ITypeSvg } from 'type-dom.ts';
export interface ITdIcon extends ITypeI {
  className: 'TdIcon',
}
export interface ITdIconConfig {
  SvgClass: ITypeSvg,
  size: string,
  color: string,
  loading: boolean,
  position: 'left' | 'right',
}
