import { UI } from '../../../../ui/ui.abstract';
import { TdContainer } from '../td-container.class';
import type { ITdHeader, ITdHeaderConfig } from './td-header.interface';

export class TdHeader extends UI implements ITdHeader {
  className: 'TdHeader';
  override props: ITdHeaderConfig;
  override parent?: TdContainer;

  constructor(params: ITdHeaderConfig = {}) {
    super();
    this.useTag('header');
    this.className = 'TdHeader';
    this.attr.addName('td-header');
    this.style.addObj({
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      flexShrink: 0,
      height: 60,
      backgroundColor: '#fff'
    });
    if (params?.slot) {
      this.slotChild(params.slot);
    }
    this.props = this.useParams(params);
  }
}
