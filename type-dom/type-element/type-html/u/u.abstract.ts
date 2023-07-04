import { TypeHtml } from '../type-html.abstract';
import { ITypeU } from './u.interface';
export abstract class TypeU extends TypeHtml implements ITypeU {
  nodeName: 'u';
  dom: HTMLElement;
  protected constructor() {
    super('u');
    this.nodeName = 'u';
    this.dom = document.createElement(this.nodeName);
  }
}
