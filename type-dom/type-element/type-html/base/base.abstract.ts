import { TypeHtml } from '../type-html.abstract';
import { ITypeBase } from './base.interface';
export abstract class TypeBase extends TypeHtml implements ITypeBase {
  nodeName: 'base';
  dom: HTMLElement;
  protected constructor() {
    super('base');
    this.nodeName = 'base';
    this.dom = document.createElement(this.nodeName);
  }
}
