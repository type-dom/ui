import { TypeHtml } from '../type-html.abstract';
import { ITypeSub } from './sub.interface';
export abstract class TypeSub extends TypeHtml implements ITypeSub {
  nodeName: 'sub';
  dom: HTMLElement;
  protected constructor() {
    super('sub');
    this.nodeName = 'sub';
    this.dom = document.createElement(this.nodeName);
  }
}
