import {
  arraySlot,
  TypeNode,
  TypeSection,
  useSlots,
} from '@type-dom/framework';
import { computed, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdContainer, ContainerProps } from './td-container.interface';
import './style/index';

export class TdContainer extends TypeSection implements ITdContainer {
  className: 'TdContainer';
  override props: ContainerProps;

  constructor(params: ContainerProps = {}) {
    super();
    this.className = 'TdContainer';
    this.attr.addName('td-container');

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const slots = useSlots();

    const ns = useNamespace('container');
    const slot = props.slot || slots?.default;
    const isVertical = computed(() => {
      if (props.direction === 'vertical') {
        return true;
      } else if (props.direction === 'horizontal') {
        return false;
      }
      if (slot) {
        const vNodes = arraySlot(slot);
        return vNodes.some((vNode) => {
          const node = unref(vNode);
          if (node instanceof TypeNode) {
            const tag = node.className;
            return tag === 'TdHeader' || tag === 'TdFooter';
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    });
    // this.assignProps({
    //   class: computed(() => [ns.b(), ns.is('vertical', isVertical.get())]), // todo 不生效
    // });
    this.attr.addClass([ns.b(), ns.is('vertical', isVertical.get())]);
    this.slotChildren(slot);
  }
}
