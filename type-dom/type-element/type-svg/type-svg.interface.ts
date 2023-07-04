import { ITextNode } from '../../text-node/text-node.interface';
import { ITypeElement } from '../type-element.interface';
export interface ITypeSvg extends ITypeElement {
  childNodes: (ITypeSvg | ITextNode)[],
}
