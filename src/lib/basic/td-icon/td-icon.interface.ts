import { TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../ui.interface';

export interface ITdIcon extends IUI {
  className: 'TdIcon',
}

export interface ITdIconConfig extends IUIConfig {
  SvgClass: any, // todo string to createSvg(svgName)
  svgObj: TypeSvgSvg;
  size: string;
  color: string;
  loading: boolean;
  position: 'left' | 'right';
}
