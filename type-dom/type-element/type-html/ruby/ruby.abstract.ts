import { TypeHtml } from '../type-html.abstract';
import { ITypeRuby } from './ruby.interface';
export abstract class TypeQ extends TypeHtml implements ITypeRuby {
  nodeName: 'ruby';
  dom: HTMLElement;
  protected constructor() {
    super('ruby');
    this.nodeName = 'ruby';
    this.dom = document.createElement(this.nodeName);
  }
}
