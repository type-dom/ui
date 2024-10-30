import { addUnit } from '@type-dom/utils';
import { UI } from '../../../../ui/ui.abstract';
import { ITdAside, ITdAsideConfig } from './td-aside.interface';

export class TdAside extends UI implements ITdAside {
  className: 'TdAside';
  override props: ITdAsideConfig;

  constructor(params: ITdAsideConfig = {}) {
    super();
    this.className = 'TdAside';
    this.style.addObj({
      overflow: 'auto',
      boxSizing: 'border-box',
      flexShrink: 0,
      width: params?.width ? addUnit(params.width) : '300px'
    });
    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }
}
