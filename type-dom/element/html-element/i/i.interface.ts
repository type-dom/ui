import { ITypeNode } from '../../../type-node/type-node.interface';
import { ITypeI } from '../../../type-element/type-html/i/i.interface';
export interface II extends ITypeI {
  className: 'I',
  childNodes: ITypeNode[],
}
