import { TypeDiv } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import { SpaceItemProps } from './td-space-item.interface';

export class TdSpaceItem extends TypeDiv {
  className: 'TdSpaceItem';
  override props: SpaceItemProps;

  constructor(params: SpaceItemProps = {}) {
    super();
    this.className = 'TdSpaceItem';
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('space');

    const classes = computed(() => `${props?.prefixCls || ns.b()}__item`);
    this.attr.addClass(classes);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
