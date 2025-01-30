import {
  getCurrentInstance,
  LI,
  onMounted,
  provide,
  TypeNode,
  TypeUL,
  UL,
  useMutationObserver,
} from '@type-dom/framework';
import { $selectGroup } from '../td-select/td-select.style';
import { ITdOptionGroup, OptionGroupProps } from './td-option-group.interface';
import { ensureArray } from '@type-dom/utils';
import { computed, Signal, signal, toRefs } from '@type-dom/signals';
import { selectGroupKey } from '../td-select/token';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdOption } from '../td-option/td-option.class';

export class TdOptionGroup extends TypeUL implements ITdOptionGroup {
  className: 'TdOptionGroup';
  override props: OptionGroupProps;

  constructor(params = {} as OptionGroupProps) {
    super();
    this.className = 'TdOptionGroup';
    this.attr.addObj({
      name: 'option-group',
    });

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('select');
    const groupRef = signal(null);
    const instance = getCurrentInstance();
    const children: Signal<TdOption[]> = signal([]);

    provide(selectGroupKey, props);

    const visible = computed(() =>
      children.get().some((option) => option.visible?.get() === true)
    );

    const isOption = (node: TypeNode) => node.className === 'TdOption';

    // get all instances of options
    const flattedChildren = (node?: TypeNode | TypeNode[]): TdOption[] => {
      if (!node) return [];
      const Nodes = ensureArray(node);
      const children: TypeNode[] = [];

      Nodes.forEach((child) => {
        if (isOption(child)) {
          children.push(child);
        } else if (child.children?.length) {
          children.push(...flattedChildren(child.children));
        }
      });

      return children as TdOption[];
    };

    const updateChildren = () => {
      children.set(flattedChildren(instance));
    };

    onMounted(() => {
      updateChildren();
    });

    useMutationObserver(groupRef, updateChildren, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
}
