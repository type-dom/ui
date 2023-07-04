import { TypeHtml } from '../type-html.abstract';
import { ITypeSelect } from './select.interface';
export abstract class TypeSelect extends TypeHtml implements ITypeSelect {
  nodeName: 'select';
  dom: HTMLSelectElement;
  protected constructor() {
    super('select');
    this.nodeName = 'select';
    this.dom = document.createElement(this.nodeName);
  }
}
