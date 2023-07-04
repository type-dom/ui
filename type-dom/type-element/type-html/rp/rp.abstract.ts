import { TypeHtml } from '../type-html.abstract';
import { ITypeRp } from './rp.interface';
export abstract class TypeRp extends TypeHtml implements ITypeRp {
  nodeName: 'rp';
  dom: HTMLElement;
  protected constructor() {
    super('rp');
    this.nodeName = 'rp';
    this.dom = document.createElement(this.nodeName);
  }
}
