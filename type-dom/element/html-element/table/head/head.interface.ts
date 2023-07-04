import { ITableHeaderCell } from '../header-cell/header-cell.interface';
import { ITypeTableHead } from '../../../../type-element/type-html/table/head/head.interface';
export interface ITableHead extends ITypeTableHead {
  className: 'TableHead',
  childNodes: ITableHeaderCell[]
}
