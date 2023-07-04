import { ITypeHtml } from '../type-html.interface';
import { ITypeLI } from './li/li.interface';
export interface ITypeUL extends ITypeHtml {
  nodeName: 'ul',
  childNodes: ITypeLI[]
}
