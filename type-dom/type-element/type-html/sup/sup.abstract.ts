import { TypeHtml } from '../type-html.abstract';
import { ITypeSup } from './sup.interface';
export abstract class TypeSup extends TypeHtml implements ITypeSup {
  nodeName: 'sup';
  dom: HTMLElement;
  protected constructor() {
    super('sup');
    this.nodeName = 'sup';
    this.dom = document.createElement(this.nodeName);
  }
}
