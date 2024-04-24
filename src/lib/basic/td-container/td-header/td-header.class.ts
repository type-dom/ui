import { UI } from '../../../ui.abstract';
import { TdContainer } from '../td-container.class';
import type { ITdHeader, ITdHeaderConfig } from './td-header.interface';

export class TdHeader extends UI implements ITdHeader {
  className: 'TdHeader';
  override parent?: TdContainer;

  constructor(config?: ITdHeaderConfig) {
    super({ tag: 'header' });
    this.className = 'TdHeader';
    this.addAttrName('td-header');
    this.addStyleObj({
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      flexShrink: 0
    });
    this.setConfig(config);
  }

  override setConfig(config?: ITdHeaderConfig): void {
    super.setConfig(config);
    this.addHeight(config?.height || '60px');
    this.addBackgroundColor(config?.backgroundColor || 'fff');
  }
}
