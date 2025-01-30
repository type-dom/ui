import {
  A,
  Div,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  TypeDiv,
} from '@type-dom/framework';
import { ITdAnchorLink, AnchorLinkProps } from './td-anchor-link.interface';
import { computed, signal, watch } from '@type-dom/signals';
import { anchorKey } from '../td-anchor/constants';

export class TdAnchorLink extends TypeDiv implements ITdAnchorLink {
  className: 'TdAnchorLink';
  override props: AnchorLinkProps;

  constructor(params: AnchorLinkProps = {}) {
    super();
    this.className = 'TdAnchorLink';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const linkRef = signal<HTMLElement | undefined>(undefined);

    const {
      ns,
      direction,
      currentAnchor,
      addLink,
      removeLink,
      handleClick: contextHandleClick,
    } = inject(anchorKey)!;

    const cls = computed(() => [
      ns.e('link'),
      ns.is('active', currentAnchor.get() === props.href),
    ]);

    const handleClick = (e?: MouseEvent) => {
      contextHandleClick(e!, props.href);
    };

    watch(
      () => props.href,
      (val, oldVal) => {
        nextTick(() => {
          if (oldVal) removeLink(oldVal);
          if (val) {
            addLink({
              href: val,
              el: linkRef.get()!,
            });
          }
        });
      }
    );

    onMounted(() => {
      const { href } = props;
      if (href) {
        addLink({
          href,
          el: linkRef.get()!,
        });
      }
    });

    onBeforeUnmount(() => {
      const { href } = props;
      if (href) {
        removeLink(href);
      }
    });

    this.attr.addClass(ns.e('item'));
    this.addChild(
      new A({
        refDom: linkRef,
        attrObj: {
          class: cls,
          href: props.href,
        },
        events: {
          click: handleClick,
        },
        slot: (props.slot || props.slots?.default) ?? props.title,
      })
    );
    this.addChild(
      new Div({
        vIf: computed(() => props.slots?.subLink && direction === 'vertical'),
        class: ns.e('list'),
        slot: props.slots?.subLink,
      })
    );
  }
}
