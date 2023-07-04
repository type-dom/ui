import { TypeHtml } from '../type-html.abstract';
import { ITypeWbr } from './wbr.interface';
export abstract class TypeWbr extends TypeHtml implements ITypeWbr {
  nodeName: 'wbr';
  dom: HTMLElement;
  protected constructor() {
    super('wbr');
    this.nodeName = 'wbr';
    this.dom = document.createElement(this.nodeName);
  }
}
