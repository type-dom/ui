import { TypeHtml } from '../type-html.abstract';
import { ITypeS } from './s.interface';
export abstract class TypeS extends TypeHtml implements ITypeS {
  nodeName: 's';
  dom: HTMLElement;
  protected constructor() {
    super('s');
    this.nodeName = 's';
    this.dom = document.createElement(this.nodeName);
  }
}
