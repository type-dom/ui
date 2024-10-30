import { ITypeConfig, Span, TextNode, TypeFragment, TypeNode } from '@type-dom/framework';
import { isObject, NOOP } from '@type-dom/utils';
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from '../../../hooks/use-forward-ref';
import { UI } from '../../../ui/ui.abstract';

export class TdOnlyChild extends UI {
  className: 'TdOnlyChild';
  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'TdOnlyChild';

    this.props = this.useParams(params);
  }

  override setup() {
    const forwardRefInjection: any = this.inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? NOOP
    );

    const defaultSlot = this.slotNodes['default'];
    if (!defaultSlot) return null;

    // if (defaultSlot.length > 1) {
    //   // debugWarn('TdOnlyChild', 'requires exact only one valid child.')
    //   return null
    // }

    // const firstLegitNode = findFirstLegitChild(defaultSlot!)
    // if (!firstLegitNode) {
    //   // debugWarn(NAME, 'no valid child node found')
    //   return null
    // }

    // return withDirectives(cloneVNode(firstLegitNode!, attrs), [
    //   [forwardRefDirective],
    // ])
    return null; // add by me todo
  }
}


function findFirstLegitChild(node: TypeNode[] | undefined): TypeNode | null {
  if (!node) return null;
  const children = node as TypeNode[]
  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      // switch (child.dom) { // todo
      //   case Comment:
      //     continue
      //   case Text:
      //   case SVGElement:
      //     return wrapTextContent(child)
      //   case undefined:
      //     return findFirstLegitChild(child.children as TypeNode[])
      //   default:
      //     return child
      // }
    }
    return wrapTextContent(child)
  }
  return null
}


function wrapTextContent(slot: string | TypeNode) {
  // const ns = 'only-child';
  // return `<span class=${ns + '-content'}>${s}</span>`;
  return new Span({
    // text: s,
    attrObj: {
      class: 'only-child-content',
    },
    childNodes: typeof slot === 'string' ? [new TextNode(slot)] : [slot],
  })
}
