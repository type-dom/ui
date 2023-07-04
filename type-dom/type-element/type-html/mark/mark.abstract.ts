import { TypeHtml } from '../type-html.abstract';
import { ITypeMark } from './mark.interface';
export abstract class TypeMark extends TypeHtml implements ITypeMark {
  nodeName: 'mark';
  dom: HTMLElement;
  protected constructor() {
    super('mark');
    this.nodeName = 'mark';
    this.dom = document.createElement(this.nodeName);
  }
}
