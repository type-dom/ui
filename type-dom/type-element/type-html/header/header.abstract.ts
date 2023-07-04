import { TypeHtml } from '../type-html.abstract';
import { ITypeHeader } from './header.interface';
export abstract class TypeHeader extends TypeHtml implements ITypeHeader {
  nodeName: 'header';
  dom: HTMLElement;
  protected constructor() {
    super('header');
    this.nodeName = 'header';
    this.dom = document.createElement(this.nodeName);
  }
}
