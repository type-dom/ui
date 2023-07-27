import { TypeRoot } from 'type-dom.ts';
import { Overlay } from '../overlay/overlay.abstract';
export class MessageBox extends Overlay {
  className: 'MessageBox';
  constructor(public parent: TypeRoot) {
    super();
    this.className = 'MessageBox';
    this.addAttrObj({
      name: 'message-box',
    });
  }
  toast(title: string, message: string): void {
    // this.clear();
    this.setTitle(title);
    this.setMsg(message);
    this.show();
  }
  confirm(title: string, message: string): void {
    this.setTitle(title);
    this.setMsg(message);
  }
}
