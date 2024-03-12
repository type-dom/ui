import { TextNode, TypeElement, TypeHeader } from '@type-dom/framework';
import type { ITdHeader, ITdHeaderConfig } from './td-header.interface';
import { TdContainer } from '../td-container.class';
export class TdHeader extends TypeHeader implements ITdHeader {
  className: 'TdHeader';
  parent?: TdContainer;
  childNodes: (TypeElement | TextNode)[];
  constructor(config?: Partial<ITdHeaderConfig>) {
    super();
    this.className = 'TdHeader';
    this.addStyleObj({
      padding: '0 20px',
      height: config?.height || '60px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundColor: '#a0cfff',
    });
    this.childNodes = [];
    if (config?.text) {
      const text = new TextNode(config?.text);
      this.childNodes = [text];
    }
  }
}
