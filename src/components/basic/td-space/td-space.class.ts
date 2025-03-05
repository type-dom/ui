import { isArray } from '@type-dom/utils';
import { computed, toRaw } from '@type-dom/signals';
import {
  arraySlot,
  isFragment,
  isValidElementNode,
  ISlotItem,
  Span,
  TypeDiv,
  TypeNode,
  For,
  ISlotRaw,
} from '@type-dom/framework';
import { ITdSpace, SpaceProps } from './td-space.interface';
import { spaceProps } from './td-space.const';
import { TdSpaceItem } from './td-space-item/td-space-item.class';
import { useSpace } from './use-space';
import './style/index';

export class TdSpace extends TypeDiv implements ITdSpace {
  className: 'TdSpace';
  override props: SpaceProps;

  constructor(params: SpaceProps = {}) {
    super();
    this.className = 'TdSpace';
    this.attr.addName('td-space');
    this.assignProps(spaceProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('td-space setup . ');
    const props = this.props;
    const { classes, containerStyle, itemStyle } = useSpace(props);
    // console.warn('containerStyle is ', containerStyle);
    // retrieve the children out via a simple for loop
    // the edge case here is that when users uses directives like <v-for>, <v-if>
    // we need to go deeper until the child is not the Fragment type
    function extractChildren(
      children: ISlotItem[],
      parentKey = '',
      extractedChildren: TypeNode[] = []
    ) {
      // console.warn('extractChildren is ', children);
      // const { prefixCls } = props
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (child instanceof For) {
            // For element should be done here
            const data = toRaw(child.props.data);
            const getter = child.props.getter;
            if (data !== undefined) {
              data.forEach((item, index) => {
                let slot: ISlotRaw;
                if (getter) {
                  slot = getter(item, index);
                } else {
                  slot = item;
                }
                extractedChildren.push(
                  new TdSpaceItem({
                    styleObj: itemStyle,
                    prefixCls: props.prefixCls,
                    slot: slot,
                  })
                );
              });
            }
          } else if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  `${parentKey + key}-`,
                  extractedChildren
                );
              } else {
                extractedChildren.push(
                  new TdSpaceItem({
                    styleObj: itemStyle,
                    prefixCls: props.prefixCls,
                    slot: nested,
                  })
                );
              }
            });
          }
          // if the current child is valid vnode, then append this current vnode
          // to item as child node.
        } else if (isValidElementNode(child)) {
          extractedChildren.push(
            new TdSpaceItem({
              styleObj: itemStyle,
              prefixCls: props.prefixCls,
              slot: child,
            })
          );
        }
      });

      return extractedChildren;
    }

    const { spacer, direction } = props;

    // this.slotChildren(props.slot || props.slots?.default);

    // this.children.forEach((item) => {
    //   if (item instanceof TypeHtml) {
    //     item.style.addObj({
    //       display: 'flex',
    //       flexWrap: 'wrap'
    //     });
    //   } else if (item instanceof TypeFragment) {
    //     item.addStyleObj({
    //       display: 'flex',
    //       flexWrap: 'wrap'
    //     })
    //   }
    // });

    // const children = renderSlot(slots, 'default', { key: 0 }, () => [])
    const children = arraySlot(props.slot ?? props.slots?.default);

    // if ((children.children ?? []).length === 0) return null
    if ((children ?? []).length === 0) return;
    // loop the children, if current children is rendered via `renderList` or `<v-for>`
    if (isArray(children)) {
      let extractedChildren = extractChildren(children);
      // console.log('extractChildren is ', extractedChildren);
      if (spacer) {
        // track the current rendering index, when encounters the last element
        // then no need to add a spacer after it.
        const len = extractedChildren.length - 1;
        extractedChildren = extractedChildren.reduce<TypeNode[]>(
          (acc, child, idx) => {
            const children = [...acc, child];
            if (idx !== len) {
              children.push(
                // adding width 100% for vertical alignment,
                // when the spacer inherit the width from the
                // parent, this span's width was not set, so space
                // might disappear
                new Span({
                  styleObj: computed(() => [
                    itemStyle.get(),
                    { width: direction === 'vertical' ? '100%' : null },
                  ]),
                  // if spacer is already a valid node, then append it to the current
                  // span element.
                  // otherwise, treat it as string.
                  slot: spacer,
                })
                // createVNode(
                //   'span',
                //   {
                //     style: [
                //       itemStyle.value,
                //       direction === 'vertical' ? 'width: 100%' : null,
                //     ],
                //     key: idx,
                //   },
                //   [
                //     isVNode(spacer)
                //       ? spacer
                //       : createTextVNode(spacer as string, PatchFlags.TEXT),
                //   ],
                //   PatchFlags.STYLE
                // )
              );
            }
            return children;
          },
          []
        );
      }

      // spacer container.
      this.attr.addClass(classes);
      this.style.addObj(containerStyle);
      this.slotChildren(extractedChildren);
    }
  }
}
