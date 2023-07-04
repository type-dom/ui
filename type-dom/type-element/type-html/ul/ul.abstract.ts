import { TypeHtml } from '../type-html.abstract';
import { ITypeUL } from './ul.interface';
import { TypeLI } from './li/li.class';
export abstract class TypeUL extends TypeHtml implements ITypeUL {
  nodeName: 'ul';
  dom: HTMLUListElement;
  childNodes: TypeLI[];
  protected constructor() {
    super('ul');
    this.nodeName = 'ul';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
