import { TypeHtml } from '../type-html.abstract';
import { ITypeCode } from './code.interface';
export abstract class TypeCode extends TypeHtml implements ITypeCode {
  nodeName: 'code';
  dom: HTMLElement;
  protected constructor() {
    super('code');
    this.nodeName = 'code';
    this.dom = document.createElement(this.nodeName);
  }
}
