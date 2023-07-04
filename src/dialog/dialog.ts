import { Overlay } from '../overlay/overlay.abstract';
import {TypeRoot} from "../../type-dom/type-root/type-root.class";
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
