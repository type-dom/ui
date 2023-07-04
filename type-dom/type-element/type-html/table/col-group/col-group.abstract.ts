import { TypeHtml } from '../../type-html.abstract';
import { ITypeColGroup } from './col-group.interface';
export abstract class TypeColGroup extends TypeHtml implements ITypeColGroup {
  nodeName: 'colgroup';
  dom: HTMLTableColElement;
  protected constructor() {
    super('colgroup');
    this.nodeName = 'colgroup';
    this.dom = document.createElement(this.nodeName);
  }
}
