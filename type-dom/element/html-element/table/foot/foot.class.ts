import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { TypeTableFoot } from '../../../../type-element/type-html/table/foot/foot.class';
import { TableRow } from '../row/row.class';
import { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  childNodes: TableRow[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'TableFoot';
    this.childNodes = [];
  }
}
