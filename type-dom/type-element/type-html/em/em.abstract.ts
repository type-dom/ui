import { TypeHtml } from '../type-html.abstract';
import { ITypeEm } from './em.interface';
export abstract class TypeEm extends TypeHtml implements ITypeEm {
  nodeName: 'em';
  dom: HTMLElement;
  protected constructor() {
    super('em');
    this.nodeName = 'em';
    this.dom = document.createElement(this.nodeName);
  }
}
