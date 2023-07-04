import { TypeHtml } from '../type-html.abstract';
import { ITypeFigure } from './figure.interface';
export abstract class TypeFigure extends TypeHtml implements ITypeFigure {
  nodeName: 'figure';
  dom: HTMLElement;
  protected constructor() {
    super('figure');
    this.nodeName = 'figure';
    this.dom = document.createElement(this.nodeName);
  }
}
