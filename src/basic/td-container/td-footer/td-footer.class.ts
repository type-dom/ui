import { TextNode, TypeFooter } from '@type-dom/framework';
import type { ITdFooter, ITdFooterConfig } from './td-footer.interface';
export class TdFooter extends TypeFooter implements ITdFooter {
  className: 'TdFooter';
  constructor(config?: Partial<ITdFooterConfig>) {
    super();
    this.className = 'TdFooter';
    this.addStyleObj({
      padding: '0 20px',
      height: config?.height ||  '60px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundColor: '#a0cfff',
    });
    if (config?.styleObj) {
      this.addStyleObj(config.styleObj);
    }
    if (config?.name) {
      this.addAttrName(config.name);
    }
    if (config?.childNodes) {
      this.childNodes = config.childNodes;
    }
    if (config?.text) {
      this.childNodes = [new TextNode(config.text)];
    }
  }
}
