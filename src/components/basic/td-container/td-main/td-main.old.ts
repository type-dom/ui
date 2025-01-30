import { TypeHtml } from '@type-dom/framework';
import { ITdMain, TdMainProps } from './td-main.interface';

export class TdMain extends TypeHtml implements ITdMain {
  className: 'TdMain';
  dom?: HTMLElement;
  override props: TdMainProps;

  constructor(params: TdMainProps = {}) {
    super();
    this.className = 'TdMain';
    this.assignProps({
      nodeName: params.tag || 'main',
    });
    this.attr.addName('td-main');
    this.style.addObj({
      display: 'block',
      flex: 1,
      flexBasis: 'auto',
      overflow: 'auto',
      boxSizing: 'border-box',
      // padding: '20px',
    });
    // console.log('then slotChild . params.slot is ', params.slot);
    this.slotChildren(params.slot);

    this.props = this.useParams(params);
  }
}
