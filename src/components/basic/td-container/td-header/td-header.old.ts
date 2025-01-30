import { TypeHeader } from '@type-dom/framework';
import { TdContainer } from '../td-container.class';
import type { ITdHeader, TdHeaderProps } from './td-header.interface';

export class TdHeader extends TypeHeader implements ITdHeader {
  className: 'TdHeader';
  override props: TdHeaderProps;
  override parent?: TdContainer;

  constructor(params: TdHeaderProps = {}) {
    super();
    this.className = 'TdHeader';
    this.attr.addName('td-header');
    this.style.addObj({
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      flexShrink: 0,
      height: 60,
      backgroundColor: '#fff',
    });
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
