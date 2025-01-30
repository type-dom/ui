import {
  TypeFragmentProps,
  Span,
  TypeFragment,
  TypeNode,
  ISlotItem,
  TypeElement,
} from '@type-dom/framework';
import { debugWarn, isObject, isString, NOOP } from '@type-dom/utils';
import {
  FORWARD_REF_INJECTION_KEY,
  ForwardRefInjectionContext,
  useForwardRef,
  useForwardRefDirective,
} from '../../../hooks/use-forward-ref';
import { Computed, isRef, Signal } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';

export class TdOnlyChild extends TypeFragment {
  className: 'TdOnlyChild';
  override props: TypeFragmentProps;

  constructor(params: TypeFragmentProps = {}) {
    super();
    this.className = 'TdOnlyChild';
    console.log('TdOnlyChild.constructor', params);
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }

  // todo
  override setup() {
    console.log('TdOnlyChild.setup', this.props);
    const forwardRefInjection = this.inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? NOOP
    );

    // const defaultSlot = this.props.slots?.default || this.props.slot;
    // if (!defaultSlot) {
    //   //   empty slot
    // } else if (isString(defaultSlot) || isRef(defaultSlot)) {
    //   //  一个文本节点
    // } else if (defaultSlot instanceof Array) {
    //   if (defaultSlot.length > 1) {
    //     debugWarn('TdOnlyChild', 'requires exact only one valid child.');
    //     // return null
    //   }
    //
    //   const firstLegitNode = findFirstLegitChild(defaultSlot);
    //   if (!firstLegitNode) {
    //     debugWarn('TdOnlyChild', 'no valid child node found');
    //     // return null
    //   }
    //   console.log('TdOnlyChild.setup firstLegitNode is ', firstLegitNode)
    // } else {
    //   //  一个组件节点
    // }
    // return withDirectives(cloneVNode(firstLegitNode!, attrs), [
    //   [forwardRefDirective],
    // ])
    // return null; // add by me todo

    const legitChild = findFirstLegitChild(this.childNodes);
    if (legitChild instanceof TypeElement) {
      legitChild?.onMounted(() => {
        forwardRefInjection?.setForwardRef(legitChild.dom);
      });
      legitChild.onUpdated(() => {
        forwardRefInjection?.setForwardRef(legitChild.dom);
      });
      legitChild.onUnmounted(() => {
        forwardRefInjection?.setForwardRef(null);
      });
    }
  }
}

function findFirstLegitChild(node?: ISlotItem): TypeNode | null {
  if (!node) return null;
  const children = node as TypeNode[];
  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (
        child.props.nodeName // todo
      ) {
        case '#comment':
          continue;
        case '#text':
          // case SVGElement:
          return wrapTextContent(child);
        case 'fragment':
          return findFirstLegitChild(child.children as TypeNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(slot: string | TypeNode) {
  const ns = useNamespace('only-child');
  return new Span({
    class: ns.e('content'),
    slot: slot,
  });
}
