import { ITypeConfig, ITypeI, TypeSvgSvg } from '@type-dom/framework';

export interface ITdIcon extends ITypeI {
  className: 'TdIcon',
}
export interface ITdIconConfig extends ITypeConfig {
  SvgClass: any, // todo string to createSvg(svgName)
  svgObj: TypeSvgSvg;
  size: string;
  color: string;
  loading: boolean;
  position: 'left' | 'right';
}
