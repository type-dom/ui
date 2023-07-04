import { TextNode } from '../../../../text-node/text-node.class';
import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { IListItem } from './list-item.interface';
export class ListItem extends TypeHtml implements IListItem {
  nodeName: 'li';
  className: 'ListItem';
  dom: HTMLLIElement;
  childNodes: (TypeHtml | TextNode)[];
  constructor(public parent: TypeHtml) {
    super('li');
    this.nodeName = 'li';
    this.dom = document.createElement(this.nodeName);
    this.className = 'ListItem';
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        width: '100px',
        textAlign: 'center',
        padding: '6px 14px',
        borderRadius: '4px 4px 0px 0px',
        borderBottom: 'none',
        boxSizing: 'border-box'
      },
      attrObj: {
        name: 'list-item',
      },
    };
  }
}
