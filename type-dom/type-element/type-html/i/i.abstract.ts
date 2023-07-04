import { TypeHtml } from '../type-html.abstract';
import { ITypeI } from './i.interface';
export abstract class TypeI extends TypeHtml implements ITypeI {
  nodeName: 'i';
  dom: HTMLElement;
  protected constructor() {
    super('i');
    this.nodeName = 'i';
    this.dom = document.createElement(this.nodeName);
  }
}
