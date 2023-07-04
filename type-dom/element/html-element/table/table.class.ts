import { TypeTable } from '../../../type-element/type-html/table/table.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import { ITable } from './table.interface';
export class Table extends TypeTable implements ITable {
  className: 'Table';
  childNodes: (TableHead | TableRow)[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Table';
    this.childNodes = [];
  }
}
