import { TextNode } from '../../../../../type-dom/text-node/text-node.class';
import { TypeSpan } from '../../../../../type-dom/type-element/type-html/span/span.abstract';
import { OverlayHeader } from '../header';

export class OverlayTitle extends TypeSpan {
  className: 'OverlayTitle';
  childNodes: TextNode[];
  text: TextNode;

  constructor(public parent: OverlayHeader) {
    super();
    this.className = 'OverlayTitle';
    this.propObj = {
      styleObj: {
        lineHeight: '16px',
        fontSize: '16px',
        color: '#000',
      },
      attrObj: {
        name: 'overlay-title',
      }
    };
    this.text = new TextNode(this, '标题');
    this.childNodes = [this.text];
  }
}
