import { TypeHtml } from '../type-html.abstract';
import { ITypePre } from './pre.interface';
export abstract class TypePre extends TypeHtml implements ITypePre {
  nodeName: 'pre';
  dom: HTMLPreElement;
  protected constructor() {
    super('pre');
    this.nodeName = 'pre';
    this.dom = document.createElement(this.nodeName);
  }
}
