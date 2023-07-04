import { TypeHtml } from '../type-html.abstract';
import { ITypeLabel } from './label.interface';
export abstract class TypeLabel extends TypeHtml implements ITypeLabel {
  nodeName: 'label';
  dom: HTMLLabelElement;
  protected constructor() {
    super('label');
    this.nodeName = 'label';
    this.dom = document.createElement(this.nodeName);
  }
}
