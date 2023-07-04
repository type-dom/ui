import { TypeHtml } from '../type-html.abstract';
import { ITypeAbbr } from './abbr.interface';
export abstract class TypeAbbr extends TypeHtml implements ITypeAbbr {
  nodeName: 'abbr';
  dom: HTMLElement;
  protected constructor() {
    super('abbr');
    this.nodeName = 'abbr';
    this.dom = document.createElement(this.nodeName);
  }
}
