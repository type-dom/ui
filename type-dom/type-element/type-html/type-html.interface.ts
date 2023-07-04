/**
 * html虚拟标签。
 * 接口与ITypeElement一样 todo
 */
import { ITypeNode } from '../../type-node/type-node.interface';
import { ITypeElement } from '../type-element.interface';
export interface ITypeHtml extends ITypeElement {
  childNodes: Array<ITypeNode>;
}
