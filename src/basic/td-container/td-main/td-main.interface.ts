import { ITypeConfig, ITypeMain, TypeElement } from '@type-dom/framework';
export interface ITdMain extends ITypeMain {
  className: 'TdMain',
}
export interface ITdMainConfig extends ITypeConfig {
  name: string;
}
