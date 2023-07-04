import { ITypeTable } from '../../../type-element/type-html/table/table.interface';
import { ITableHead } from './head/head.interface';
import { ITableRow } from './row/row.interface';
export interface ITable extends ITypeTable {
  className: 'Table',
  childNodes: (ITableRow | ITableHead)[],
}
