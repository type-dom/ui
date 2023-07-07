import { TypeRoot } from 'type-dom.ts';
import { Overlay } from '../overlay/overlay.abstract';
export class WebDialog extends Overlay {
  className: 'WebDialog';
  constructor(public parent: TypeRoot) {
    super();
    this.className = 'WebDialog';
    this.addAttrObj({
      name: 'editor-dialog',
    });
  }
}
