import { TypeHtml } from '../type-html.abstract';
import { ITypeMenuItem } from './menu-item.interface';
export abstract class TypeMenuItem extends TypeHtml implements ITypeMenuItem {
  nodeName: 'menuitem';
  dom: HTMLElement;
  protected constructor() {
    super('menuitem');
    this.nodeName = 'menuitem';
    this.dom = document.createElement(this.nodeName);
  }
}
