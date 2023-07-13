import { Span, TextNode, TypeRoot } from 'type-dom.ts';
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
  confirm(message: string): void {
    // this.root.app.
    const span = new Span(this.container.body);
    const textNode = new TextNode(span, message);
    span.addChild(textNode);
    this.container.body.appendChild(span);
    // this.container.footer.
  }
}
