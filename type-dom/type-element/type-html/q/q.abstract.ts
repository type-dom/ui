import { TypeHtml } from '../type-html.abstract';
import { ITypeQ } from './q.interface';
export abstract class TypeQ extends TypeHtml implements ITypeQ {
  nodeName: 'q';
  dom: HTMLQuoteElement;
  protected constructor() {
    super('q');
    this.nodeName = 'q';
    this.dom = document.createElement(this.nodeName);
  }
}
