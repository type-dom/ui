import { ITdScrollbar, ITdScrollbarConfig } from './td-scrollbar.interface';
import { UI } from '../../ui.abstract';

export class TdScrollbar extends UI implements ITdScrollbar {
  className: 'TdScrollbar';

  constructor(config?: Partial<ITdScrollbarConfig>) {
    super(config);
    this.className = 'TdScrollbar';
    this.setConfig(config);
  }

  override setConfig(config?: Partial<ITdScrollbarConfig>) {
    super.setConfig(config);

  }
}
