import { ITypeHtml } from '../../type-html.interface';
import { ITypeTableHeaderCell } from '../header-cell/header-cell.interface';
export interface ITypeTableHead extends ITypeHtml {
  nodeName: 'thead',
  childNodes: ITypeTableHeaderCell[]
}
