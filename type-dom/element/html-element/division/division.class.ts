import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { IDivision } from './division.interface';
export class Division extends TypeDiv implements IDivision {
  className: 'Division';
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Division';
  }
}
