import { ITypeI } from '../../../type-dom/type-element/type-html/i/i.interface';
export interface ITdIcon extends ITypeI {
  className: 'TdIcon',
}

export interface ITdIconConfig {
  SvgClass: any,
  size: string,
  color: string,
  loading: boolean,
  position: 'left' | 'right',
}
