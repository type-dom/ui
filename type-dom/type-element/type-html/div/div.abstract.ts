import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv } from './div.interface';
export abstract class TypeDiv extends TypeHtml implements ITypeDiv {
  nodeName: 'div';
  dom: HTMLDivElement;
  protected constructor() {
    super('div');
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
  }
}
