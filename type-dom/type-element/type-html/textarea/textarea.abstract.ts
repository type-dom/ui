import { TypeHtml } from '../type-html.abstract';
import { ITypeTextarea } from './textarea.interface';
export abstract class TypeTextarea extends TypeHtml implements ITypeTextarea {
  nodeName: 'textarea';
  dom: HTMLTextAreaElement;
  protected constructor() {
    super('textarea');
    this.nodeName = 'textarea';
    this.dom = document.createElement(this.nodeName);
  }
}
