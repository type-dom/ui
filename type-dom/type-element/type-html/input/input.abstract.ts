import { TypeHtml } from '../type-html.abstract';
import { ITypeInput } from './input.interface';
export abstract class TypeInput extends TypeHtml implements ITypeInput {
  nodeName: 'input';
  dom: HTMLInputElement;
  protected constructor() {
    super('input');
    this.nodeName = 'input';
    this.dom = document.createElement(this.nodeName);
  }
}
