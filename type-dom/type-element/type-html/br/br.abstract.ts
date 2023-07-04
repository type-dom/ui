import { TypeHtml } from '../type-html.abstract';
import { ITypeBr } from './br.interface';
export abstract class TypeBr extends TypeHtml implements ITypeBr {
  nodeName: 'br';
  dom: HTMLBRElement;
  protected constructor() {
    super('br');
    this.nodeName = 'br';
    this.dom = document.createElement(this.nodeName);
  }
}
