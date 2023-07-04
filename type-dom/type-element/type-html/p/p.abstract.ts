import { TypeHtml } from '../type-html.abstract';
import { ITypeP } from './p.interface';
export abstract class TypeP extends TypeHtml implements ITypeP {
  nodeName: 'p';
  dom: HTMLParagraphElement;
  protected constructor() {
    super('p');
    this.nodeName = 'p';
    this.dom = document.createElement(this.nodeName);
  }
}
