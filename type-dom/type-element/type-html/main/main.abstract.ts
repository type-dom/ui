import { TypeHtml } from '../type-html.abstract';
import { ITypeMain } from './main.interface';
export abstract class TypeMain extends TypeHtml implements ITypeMain {
  nodeName: 'main';
  dom: HTMLElement;
  protected constructor() {
    super('main');
    this.nodeName = 'main';
    this.dom = document.createElement(this.nodeName);
  }
}
