import { TypeHtml } from '../type-html.abstract';
import { ITypeTable } from './table.interface';
export abstract class TypeTable extends TypeHtml implements ITypeTable {
  nodeName: 'table';
  dom: HTMLTableElement;
  protected constructor() {
    super('table');
    this.nodeName = 'table';
    this.dom = document.createElement(this.nodeName);
  }
}
