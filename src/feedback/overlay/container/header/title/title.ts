import { TextNode, TypeSpan } from 'type-dom.ts';
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
