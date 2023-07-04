import { TypeHtml } from '../type-html.abstract';
import { ITypeBlockQuote } from './block-quote.interface';
export abstract class TypeBlockQuote extends TypeHtml implements ITypeBlockQuote {
  nodeName: 'blockquote';
  dom: HTMLQuoteElement;
  protected constructor() {
    super('blockquote');
    this.nodeName = 'blockquote';
    this.dom = document.createElement(this.nodeName);
  }
}
