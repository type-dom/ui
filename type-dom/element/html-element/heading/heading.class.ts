import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { IHeading } from './heading.interface';

// h1,h2,h3,h4,h5
export class Heading extends TypeHtml implements IHeading {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  dom: HTMLHeadingElement;
  className: 'Heading';
  childNodes: TextNode[];
  constructor(public parent: TypeHtml, nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    super(nodeName);
    this.nodeName = nodeName;
    this.dom = document.createElement(this.nodeName);
    this.className = 'Heading';
    this.childNodes = [];
  }
}
