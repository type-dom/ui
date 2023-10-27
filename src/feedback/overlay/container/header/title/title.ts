import { TextNode, TypeSpan } from 'type-dom.ts';
import { OverlayHeader } from '../header';
export class OverlayTitle extends TypeSpan {
  className: 'OverlayTitle';
  parent?: OverlayHeader;
  childNodes: TextNode[];
  text: TextNode;
  constructor() {
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
    this.text = new TextNode('标题');
    this.childNodes = [this.text];
  }
}
