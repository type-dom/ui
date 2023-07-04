import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSpan } from '../../../type-element/type-html/span/span.abstract';
import { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Span';
  }
}
