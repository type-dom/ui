import { TypeHtml } from '../type-html.abstract';
import { ITypeCite } from './cite.interface';
export abstract class TypeCite extends TypeHtml implements ITypeCite {
  nodeName: 'cite';
  dom: HTMLElement;
  protected constructor() {
    super('cite');
    this.nodeName = 'cite';
    this.dom = document.createElement(this.nodeName);
  }
}
