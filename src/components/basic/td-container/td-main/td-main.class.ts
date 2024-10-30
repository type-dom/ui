import { UI } from '../../../../ui/ui.abstract';
import { ITdMain, ITdMainConfig } from './td-main.interface';

export class TdMain extends UI implements ITdMain {
  className: 'TdMain';
  override props: ITdMainConfig;

  constructor(params: ITdMainConfig = {}) {
    super();
    this.useTag(params?.tag || 'main');
    this.className = 'TdMain';
    this.style.addObj({
      display: 'block',
      flex: 1,
      flexBasis: 'auto',
      overflow: 'auto',
      boxSizing: 'border-box'
      // padding: '20px',
    });
    this.addChild(this.getSlotNode());
    console.warn('TdMain slotNodes.default is ', this.getSlotNode());
    this.props = this.useParams(params);
  }
}
