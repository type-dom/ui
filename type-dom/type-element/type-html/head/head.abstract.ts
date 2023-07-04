import { TypeHtml } from '../type-html.abstract';
import { ITypeHead } from './head.interface';
export abstract class TypeHead extends TypeHtml implements ITypeHead {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  dom: HTMLElement;
  protected constructor(nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1') {
    super(nodeName);
    this.nodeName = nodeName;
    this.dom = document.createElement(this.nodeName);
  }
}
