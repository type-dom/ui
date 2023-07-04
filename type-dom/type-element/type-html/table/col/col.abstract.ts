import { TypeHtml } from '../../type-html.abstract';
import { ITypeCol } from './col.interface';
export abstract class TypeCol extends TypeHtml implements ITypeCol {
  nodeName: 'col';
  dom: HTMLTableColElement;
  protected constructor() {
    super('col');
    this.nodeName = 'col';
    this.dom = document.createElement(this.nodeName);
  }
}
