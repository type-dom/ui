import { TypeHtml } from '../type-html.abstract';
import { ITypeDel } from './del.interface';
export abstract class TypeDel extends TypeHtml implements ITypeDel {
  nodeName: 'del';
  dom: HTMLModElement;
  protected constructor() {
    super('del');
    this.nodeName = 'del';
    this.dom = document.createElement(this.nodeName);
  }
}
