import { TypeHtml } from '../type-html.abstract';
import { ITypeFooter } from './footer.interface';
export abstract class TypeFooter extends TypeHtml implements ITypeFooter {
  nodeName: 'footer';
  dom: HTMLElement;
  protected constructor() {
    super('footer');
    this.nodeName = 'footer';
    this.dom = document.createElement(this.nodeName);
  }
}
