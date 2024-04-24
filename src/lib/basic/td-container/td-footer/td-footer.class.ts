import { UI } from '../../../ui.abstract';
import type { ITdFooter, ITdFooterConfig } from './td-footer.interface';
import type { ITdHeaderConfig } from '../td-header/td-header.interface';

export class TdFooter extends UI implements ITdFooter {
  className: 'TdFooter';

  constructor(config?: Partial<ITdFooterConfig>) {
    super({ tag: 'footer' });
    this.className = 'TdFooter';
    this.addStyleObj({
      padding: '0 20px',
      height: config?.height || '60px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundColor: '#a0cfff'
    });
    this.setConfig(config);
  }

  override setConfig(config?: Partial<ITdHeaderConfig>): void {
    super.setConfig(config);
    this.addHeight(config?.height || '60px');
    this.addBackgroundColor(config?.backgroundColor || 'fff');
  }
}
