import { TypeTableHead } from '../../../../type-element/type-html/table/head/head.class';
import { TableHeaderCell } from '../header-cell/header-cell.class';
import { Table } from '../table.class';
import { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';
  childNodes: TableHeaderCell[];
  constructor(public parent: Table) {
    super();
    this.className = 'TableHead';
    this.childNodes = [];
  }
}
