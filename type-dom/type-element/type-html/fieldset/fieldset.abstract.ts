import { TypeHtml } from '../type-html.abstract';
import { ITypeFieldset } from './fieldset.interface';
export abstract class TypeFieldset extends TypeHtml implements ITypeFieldset {
  nodeName: 'fieldset';
  dom: HTMLFieldSetElement;
  protected constructor() {
    super('fieldset');
    this.nodeName = 'fieldset';
    this.dom = document.createElement(this.nodeName);
  }
}
