import { TypeTableDataCell } from '../../../../type-element/type-html/table/data-cell/data-cell.class';
import { TableRow } from '../row/row.class';
import { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';
  constructor(public parent: TableRow) {
    super();
    this.className = 'TableDataCell';
    this.childNodes = [];
  }
}
