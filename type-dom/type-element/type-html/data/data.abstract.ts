import { TypeHtml } from '../type-html.abstract';
import { ITypeData } from './data.interface';
export abstract class TypeData extends TypeHtml implements ITypeData {
  nodeName: 'data';
  dom: HTMLDataElement;
  protected constructor() {
    super('data');
    this.nodeName = 'data';
    this.dom = document.createElement(this.nodeName);
  }
}
