import { TypeAside } from '@type-dom/framework';
import { ITdAside, ITdAsideConfig } from './td-aside.interface';
import { UI } from '../../../ui.abstract';

export class TdAside extends UI implements ITdAside {
  className: 'TdAside';

  constructor(config?: Partial<ITdAsideConfig>) {
    super();
    this.className = 'TdAside';
    this.addStyleObj({
      overflow: 'auto',
      boxSizing: 'border-box',
      flexShrink: 0,
      width: '300px'
    });
    if (config?.width) {
      if (typeof config.width !== 'number') {
        console.warn('TdAside: width should be a number');
        this.addStyleObj({
          width: config.width
        });
      }
      this.addStyleObj({
        width: config.width + 'px'
      });
    }
    this.setConfig(config);
  }
}
