import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { IHeader } from './header.interface';
export class Header extends TypeHtml implements IHeader {
  nodeName: 'header';
  dom: HTMLElement;
  className: 'Header';
  constructor(public parent: TypeHtml) {
    super('header');
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Header';
  }
}
