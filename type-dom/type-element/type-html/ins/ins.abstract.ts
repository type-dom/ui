import { TypeHtml } from '../type-html.abstract';
import { ITypeIns } from './ins.interface';
export abstract class TypeIns extends TypeHtml implements ITypeIns {
  nodeName: 'ins';
  dom: HTMLModElement;
  protected constructor() {
    super('ins');
    this.nodeName = 'ins';
    this.dom = document.createElement(this.nodeName);
  }
}
