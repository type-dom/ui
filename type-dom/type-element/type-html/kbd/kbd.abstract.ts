import { TypeHtml } from '../type-html.abstract';
import { ITypeKbd } from './kbd.interface';
export abstract class TypeKbd extends TypeHtml implements ITypeKbd {
  nodeName: 'kbd';
  dom: HTMLElement;
  protected constructor() {
    super('kbd');
    this.nodeName = 'kbd';
    this.dom = document.createElement(this.nodeName);
  }
}
