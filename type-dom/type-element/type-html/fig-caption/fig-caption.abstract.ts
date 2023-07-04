import { TypeHtml } from '../type-html.abstract';
import { ITypeFigCaption } from './fig-caption.interface';
export abstract class TypeFigCaption extends TypeHtml implements ITypeFigCaption {
  nodeName: 'figcaption';
  dom: HTMLElement;
  protected constructor() {
    super('figcaption');
    this.nodeName = 'figcaption';
    this.dom = document.createElement(this.nodeName);
  }
}
