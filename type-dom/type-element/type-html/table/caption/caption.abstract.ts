import { TypeHtml } from '../../type-html.abstract';
import { ITypeCaption } from './caption.interface';
export abstract class TypeCaption extends TypeHtml implements ITypeCaption {
  nodeName: 'caption';
  dom: HTMLTableCaptionElement;
  protected constructor() {
    super('caption');
    this.nodeName = 'caption';
    this.dom = document.createElement(this.nodeName);
  }
}
