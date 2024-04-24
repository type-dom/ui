import { TextNode, TypeSpan } from '@type-dom/framework';
import { OverlayHeader } from '../header';

export class OverlayTitle extends TypeSpan {
  className: 'OverlayTitle';
  override parent?: OverlayHeader;
  override childNodes: TextNode[];
  override textNode: TextNode;

  constructor() {
    super();
    this.className = 'OverlayTitle';
    this.styleObj = {
      lineHeight: '16px',
      fontSize: '16px',
      color: '#000'
    };
    this.attrObj = {
      name: 'overlay-title'
    };
    this.textNode = new TextNode('标题');
    this.childNodes = [this.textNode];
  }
}
