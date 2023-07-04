import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { TypeBr } from '../../../type-element/type-html/br/br.abstract';
import { IBr } from './br.interface';
export class Br extends TypeBr implements IBr {
  className: 'Br';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Br';
  }
}
