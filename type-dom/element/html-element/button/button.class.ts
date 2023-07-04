import { TypeButton } from '../../../type-element/type-html/button/button.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { IButton } from './button.interface';
export class Button extends TypeButton implements IButton {
  className: 'Button';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Button';
  }
}
