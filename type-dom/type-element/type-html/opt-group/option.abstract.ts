import { TypeHtml } from '../type-html.abstract';
import { ITypeOption } from './option.interface';
export abstract class TypeOption extends TypeHtml implements ITypeOption {
  nodeName: 'option';
  dom: HTMLOptionElement;
  protected constructor() {
    super('option');
    this.nodeName = 'option';
    this.dom = document.createElement(this.nodeName);
  }
}
