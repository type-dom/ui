import { UI } from '../../../ui.abstract';
import { ITdMain, ITdMainConfig } from './td-main.interface';

export class TdMain extends UI implements ITdMain {
  className: 'TdMain';

  constructor(config?: Partial<ITdMainConfig>) {
    super({ tag: 'main' });
    this.className = 'TdMain';
    this.addStyleObj({
      display: 'block',
      flex: 1,
      flexBasis: 'auto',
      overflow: 'auto',
      boxSizing: 'border-box'
      // padding: '20px',
    });
    this.setConfig(config);
  }
}
