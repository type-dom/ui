import { TypeTableRow } from '../../../../type-element/type-html/table/row/row.class';
import { Table } from '../table.class';
import { ITableRow } from './row.interface';
import { TableDataCell } from '../data-cell/data-cell.class';
export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  childNodes: TableDataCell[];
  constructor(public parent: Table) {
    super();
    this.className = 'TableRow';
    this.childNodes = [];
  }
}
