import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { ISlot } from './slot.interface';
export class Slot extends TypeHtml implements ISlot {
  nodeName: 'slot';
  className: 'Slot';
  dom: HTMLSlotElement;
  constructor(public parent: TypeHtml) {
    super('slot');
    this.nodeName = 'slot';
    this.className = 'Slot';
    this.dom = document.createElement(this.nodeName);
  }
}
