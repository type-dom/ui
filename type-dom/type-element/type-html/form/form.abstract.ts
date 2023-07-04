import { TypeHtml } from '../type-html.abstract';
import { ITypeForm } from './form.interface';
export abstract class TypeForm extends TypeHtml implements ITypeForm {
  nodeName: 'form';
  dom: HTMLFormElement;
  protected constructor() {
    super('form');
    this.nodeName = 'form';
    this.dom = document.createElement(this.nodeName);
  }
}
