import { ITypeElement } from '../type-element.interface';
import { ITypeHtml } from '../type-html/type-html.interface';
export interface ITypeContainer extends ITypeHtml {
  nodeName: 'div';
  childNodes: Array<ITypeElement>;// contents
}
