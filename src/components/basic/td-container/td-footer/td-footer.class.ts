import { UI } from '../../../../ui/ui.abstract';
import type { ITdFooter, ITdFooterConfig } from './td-footer.interface';

export class TdFooter extends UI implements ITdFooter {
  className: 'TdFooter';
  override props: ITdFooterConfig

  constructor(params: ITdFooterConfig = {}) {
    super();
    this.useTag('footer');
    this.className = 'TdFooter';
    this.style.addObj({
      padding: '0 20px',
      height: params?.height || '60px',
      boxSizing: 'border-box',
      flexShrink: 0,
      backgroundColor: params?.backgroundColor || 'fff' // '#a0cfff'
    });
    if (params?.slot) {
      this.slotChild(params.slot);
    }
    this.props = this.useParams(params);
  }

  // override setup(params?: ITdFooterConfig): void {
  //   // this.addHeight(params?.height || '60px');
  //   // this.addBackgroundColor(params?.backgroundColor || 'fff');
  // }
}
