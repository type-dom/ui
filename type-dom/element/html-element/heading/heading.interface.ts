import { ITypeElement } from '../../../type-element/type-element.interface';
import { ITextNode } from '../../../text-node/text-node.interface';
export interface IHeading extends ITypeElement {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: 'Heading',
  childNodes: ITextNode[],
}
