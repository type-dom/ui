import { TypeRoot } from 'type-dom.ts';
import { Overlay } from '../overlay/overlay.abstract';
export class Dialog extends Overlay {
  className: 'Dialog';
  constructor(public parent: TypeRoot) {
    super();
    this.className = 'Dialog';
    this.addAttrObj({
      name: 'dialog',
    });
  }
}
