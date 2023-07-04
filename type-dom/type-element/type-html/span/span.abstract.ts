import { TypeHtml } from '../type-html.abstract';
import { ITypeSpan } from './span.interface';
export abstract class TypeSpan extends TypeHtml implements ITypeSpan {
  nodeName: 'span';
  dom: HTMLSpanElement;
  protected constructor() {
    super('span');
    this.nodeName = 'span';
    this.dom = document.createElement(this.nodeName);
  }
}
