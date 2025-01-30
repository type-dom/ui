import {
  arraySlot,
  TypeProps,
  TypeElement,
  TypeNode,
  TypeSection,
  useSlots,
} from '@type-dom/framework';
import { computed, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
import { ITdContainer, ContainerProps } from './td-container.interface';
import './style/index';

export class TdContainer extends TypeSection implements ITdContainer {
  className: 'TdContainer';
  override props: ContainerProps;
  override childNodes: (
    | TdAside
    | TdHeader
    | TdMain
    | TdContainer
    | TypeElement
  )[];

  constructor(params: ContainerProps = {}) {
    super();
    this.className = 'TdContainer';
    this.childNodes = [];
    this.attr.addObj({
      name: 'td-container',
    });

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
    this.assignProps({
      class: computed(() => [ns.b(), ns.is('vertical', isVertical.get())]),
    });
    this.slotChildren(slot);
  }
}
