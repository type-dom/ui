import { TypeHtml } from '../type-html.abstract';
import { ITypeAddress } from './address.interface';
export abstract class TypeAddress extends TypeHtml implements ITypeAddress {
  nodeName: 'address';
  dom: HTMLElement;
  protected constructor() {
    super('address');
    this.nodeName = 'address';
    this.dom = document.createElement(this.nodeName);
  }
}
