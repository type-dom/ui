import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { ITextarea } from './textarea.interface';

export class Textarea extends TypeHtml implements ITextarea {
  nodeName: 'textarea';
  className: 'TextArea';
  dom: HTMLTextAreaElement;
  childNodes: [];
  value: string | number | boolean | undefined;
  constructor(public parent: TypeHtml) {
    super('textarea');
    this.nodeName = 'textarea';
    this.className = 'TextArea';
    this.dom = document.createElement(this.nodeName);
    this.propObj.styleObj = {
      outline: 'none',
    };
    this.childNodes = [];
  }
  getValue(): string {
    return this.dom.value; // this.value
  }
  setValue(value: string | number | boolean): void {
    this.value = value;
    this.dom.value = String(value);
  }
}
