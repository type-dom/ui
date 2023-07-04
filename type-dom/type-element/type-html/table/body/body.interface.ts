import { ITypeHtml } from '../../type-html.interface';
import { ITypeTableRow } from '../row/row.interface';
export interface ITypeTableBody extends ITypeHtml {
  nodeName: 'tbody',
  childNodes: ITypeTableRow[],
}
