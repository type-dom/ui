import { TypeHtml } from '../type-html.abstract';
import { ITypeRt } from './rt.interface';
export abstract class TypeRt extends TypeHtml implements ITypeRt {
  nodeName: 'rt';
  dom: HTMLElement;
  protected constructor() {
    super('rt');
    this.nodeName = 'rt';
    this.dom = document.createElement(this.nodeName);
  }
}
