import { ITextNode } from '../../../text-node/text-node.interface';
import { ITypeHtml } from '../../../type-element/type-html/type-html.interface';

export interface ILabel extends ITypeHtml {
  nodeName: 'label',
  className: 'Label',
  childNodes: ITextNode[],
}
