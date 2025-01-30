import { TypeMain } from '@type-dom/framework';
import { useNamespace } from '../../../../hooks/use-namespace';
import { ITdMain, TdMainProps } from './td-main.interface';

export class TdMain extends TypeMain implements ITdMain {
  className: 'TdMain';
  override props: TdMainProps;

  constructor(params: TdMainProps = {}) {
    super();
    this.className = 'TdMain';
    this.attr.addName('td-main');
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('main');
    this.attr.addClass(ns.b());
    this.slotChildren(props.slot || props.slots?.default);
  }
}
