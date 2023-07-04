import { TypeHtml } from '../type-html.abstract';
import { ITypeVar } from './var.interface';
export abstract class TypeVar extends TypeHtml implements ITypeVar {
  nodeName: 'var';
  dom: HTMLElement;
  protected constructor() {
    super('var');
    this.nodeName = 'var';
    this.dom = document.createElement(this.nodeName);
  }
}
