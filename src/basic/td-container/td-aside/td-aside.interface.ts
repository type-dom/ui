import { ITypeAside, ITypeConfig, TypeElement } from '@type-dom/framework';
export interface ITdAside extends ITypeAside {
  className: 'td-aside'
}
export interface ITdAsideConfig extends ITypeConfig {
  name: string;
  width: string | number;
}
