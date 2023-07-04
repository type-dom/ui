import { TextNode } from '../../../../text-node/text-node.class';
import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableHeaderCell } from './header-cell.interface';

// 表格表头 table header cell
export abstract class TypeTableHeaderCell extends TypeHtml implements ITypeTableHeaderCell {
  nodeName: 'th';
  dom: HTMLElement;
  childNodes: TextNode[];
  protected constructor() {
    super('th');
    this.nodeName = 'th';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
