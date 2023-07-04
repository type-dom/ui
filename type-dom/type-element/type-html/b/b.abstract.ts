import { TypeHtml } from '../type-html.abstract';
import { ITypeB } from './b.interface';
export abstract class TypeB extends TypeHtml implements ITypeB {
  nodeName: 'b';
  dom: HTMLElement;
  protected constructor() {
    super('b');
    this.nodeName = 'b';
    this.dom = document.createElement(this.nodeName);
  }
}
