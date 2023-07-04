import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableDataCell } from './data-cell.interface';
export abstract class TypeTableDataCell extends TypeHtml implements ITypeTableDataCell {
  nodeName: 'td';
  dom: HTMLElement;
  protected constructor() {
    super('td');
    this.nodeName = 'td';
    this.dom = document.createElement(this.nodeName);
  }
}
