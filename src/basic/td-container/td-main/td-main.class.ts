import { TypeMain } from '@type-dom/framework';
import { ITdMain, ITdMainConfig } from './td-main.interface';
export class TdMain extends TypeMain implements ITdMain {
  className: 'TdMain';
  constructor(config?: Partial<ITdMainConfig>) {
    super();
    this.className = 'TdMain';
    this.addStyleObj({
      display: 'block',
      flex: 1,
      flexBasis: 'auto',
      overflow: 'auto',
      boxSizing: 'border-box',
      // padding: '20px',
    });
    if (config?.name) {
      this.addAttrName(config.name);
    }
    this.setConfig(config);
  }
}
