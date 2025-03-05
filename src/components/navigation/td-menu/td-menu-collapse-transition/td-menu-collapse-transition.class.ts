import {
  Transition,
  TransitionProps,
  TypeFragment,
  TypeFragmentProps,
  TypeProps,
  TypeTransitionProps
} from '@type-dom/framework';
import { addClass, hasClass, removeClass } from '@type-dom/utils';
import { useNamespace } from '../../../../hooks/use-namespace';


export class TdMenuCollapseTransition extends TypeFragment {
  className: 'TdMenuCollapseTransition';

  constructor(params: TypeFragmentProps = {}) {
    super();
    this.className = 'TdMenuCollapseTransition';
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('menu')
    const listeners = {
      onBeforeEnter: (el) => (el!.style.opacity = '0.2'),
      onEnter(el, done) {
        addClass(el, `${ns.namespace.get()}-opacity-transition`)
        el!.style.opacity = '1'
        done?.()
      },

      onAfterEnter(el) {
        removeClass(el!, `${ns.namespace.get()}-opacity-transition`)
        el!.style.opacity = ''
      },

      onBeforeLeave(el) {
        if (!el) return;
        if (!el.dataset) (el as any).dataset = {}

        if (hasClass(el, ns.m('collapse'))) {
          removeClass(el, ns.m('collapse'))
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          addClass(el, ns.m('collapse'))
        } else {
          addClass(el, ns.m('collapse'))
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          removeClass(el, ns.m('collapse'))
        }

        el.style.width = `${el.scrollWidth}px`
        el.style.overflow = 'hidden'
      },

      onLeave(el: HTMLElement) {
        addClass(el, 'horizontal-collapse-transition')
        el.style.width = `${el.dataset.scrollWidth}px`
      },
    } as TypeTransitionProps<HTMLElement> as TransitionProps

    this.addChild(new Transition({
      mode: 'out-in',
      ...listeners,
      slot: props.slot ?? props.slots?.default,
    }))
  }
}
