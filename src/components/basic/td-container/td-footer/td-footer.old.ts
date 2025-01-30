import { TypeFooter } from '@type-dom/framework';
import type { ITdFooter, FooterProps } from './td-footer.interface';

export class TdFooter extends TypeFooter implements ITdFooter {
  className: 'TdFooter';
  override props: FooterProps;

  constructor(params: FooterProps = {}) {
    super();
    this.className = 'TdFooter';
    this.attr.addName('td-footer');
    this.style.addObj({
      padding: '0 20px',
      height: params?.height || '60px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundColor: params?.backgroundColor || 'fff', // '#a0cfff'
    });
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  // override setup(params?: FooterProps): void {
  //   // this.addHeight(params?.height || '60px');
  //   // this.addBackgroundColor(params?.backgroundColor || 'fff');
  // }
}
