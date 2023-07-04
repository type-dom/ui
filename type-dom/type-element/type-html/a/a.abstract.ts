import { TypeHtml } from '../type-html.abstract';
import { ITypeA } from './a.interface';
export abstract class TypeA extends TypeHtml implements ITypeA {
  nodeName: 'a';
  dom: HTMLAnchorElement;
  protected constructor() {
    super('a');
    this.nodeName = 'a';
    this.dom = document.createElement(this.nodeName);
  }
}
