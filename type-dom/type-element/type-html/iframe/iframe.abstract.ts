import { TypeHtml } from '../type-html.abstract';
import { ITypeIFrame } from './iframe.interface';
export abstract class TypeIFrame extends TypeHtml implements ITypeIFrame {
  nodeName: 'iframe';
  dom: HTMLIFrameElement;
  protected constructor() {
    super('iframe');
    this.nodeName = 'iframe';
    this.dom = document.createElement(this.nodeName);
  }
}
