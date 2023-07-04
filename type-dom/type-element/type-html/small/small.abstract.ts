import { TypeHtml } from '../type-html.abstract';
import { ITypeSmall } from './small.interface';
export abstract class TypeSmall extends TypeHtml implements ITypeSmall {
  nodeName: 'small';
  dom: HTMLElement;
  protected constructor() {
    super('small');
    this.nodeName = 'small';
    this.dom = document.createElement(this.nodeName);
  }
}
