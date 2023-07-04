import { ITextNode } from '../../../../text-node/text-node.interface';
import { ITypeHtml } from '../../type-html.interface';

export interface ITypeTableHeaderCell extends ITypeHtml {
  nodeName: 'th',
  childNodes: ITextNode[]
}
