import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.class';
import { ITypeTableBody } from './body.interface';

export abstract class TypeTableBody extends TypeHtml implements ITypeTableBody {
  nodeName: 'tbody';
  dom: HTMLTableSectionElement;
  childNodes: TypeTableRow[];
  protected constructor() {
    super('tbody');
    this.nodeName = 'tbody';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
