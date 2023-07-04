import { TypeHtml } from '../../type-html.abstract';
import { TypeTableHeaderCell } from '../header-cell/header-cell.class';
import { ITypeTableHead } from './head.interface';

// 表格页眉
export abstract class TypeTableHead extends TypeHtml implements ITypeTableHead {
  nodeName: 'thead';
  dom: HTMLTableSectionElement;
  childNodes: TypeTableHeaderCell[];
  protected constructor() {
    super('thead');
    this.nodeName = 'thead';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
