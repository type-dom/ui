import { TextNode } from '../../type-dom/text-node/text-node.class';
import { Span } from '../../type-dom/element/html-element/span/span.class';
import { Overlay } from '../overlay/overlay.abstract';
import {TypeRoot} from "../../type-dom/type-root/type-root.class";
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
