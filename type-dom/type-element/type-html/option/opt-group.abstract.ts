import { TypeHtml } from '../type-html.abstract';
import { ITypeOptGroup } from './opt-group.interface';
export abstract class TypeOptGroup extends TypeHtml implements ITypeOptGroup {
  nodeName: 'optgroup';
  dom: HTMLOptGroupElement;
  protected constructor() {
    super('optgroup');
    this.nodeName = 'optgroup';
    this.dom = document.createElement(this.nodeName);
  }
}
