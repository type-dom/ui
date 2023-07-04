import { TypeHtml } from '../type-html.abstract';
import { ITypeSection } from './section.interface';
export abstract class TypeSection extends TypeHtml implements ITypeSection {
  nodeName: 'section';
  dom: HTMLElement;
  protected constructor() {
    super('section');
    this.nodeName = 'section';
    this.dom = document.createElement(this.nodeName);
  }
}
