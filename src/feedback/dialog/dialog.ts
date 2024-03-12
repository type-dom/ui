import { TypeRoot } from '@type-dom/framework';
import { Overlay } from '../overlay/overlay.abstract';
export class Dialog extends Overlay {
  className: 'Dialog';
  parent?: TypeRoot;
  constructor() {
    super();
    this.className = 'Dialog';
    this.addAttrObj({
      name: 'dialog',
    });
  }
}
