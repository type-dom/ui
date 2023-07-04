import { ITypeHtml } from '../type-html/type-html.interface';
import { ITypeNode } from '../../type-node/type-node.interface';
export interface ITypeComponent extends ITypeHtml {
  nodeName: string;
  childNodes: Array<ITypeNode>;// contents
}
export interface IComponent extends ITypeNode {
  TypeClass: any,
  config: any,
}
