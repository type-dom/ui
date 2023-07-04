import { TypeHtml } from '../type-html.abstract';
import { ITypeSamp } from './samp.interface';
export abstract class TypeSamp extends TypeHtml implements ITypeSamp {
  nodeName: 'samp';
  dom: HTMLElement;
  protected constructor() {
    super('samp');
    this.nodeName = 'samp';
    this.dom = document.createElement(this.nodeName);
  }
}
