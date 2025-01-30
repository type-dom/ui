import {
  TransitionProps,
  RendererElement,
  Transition,
  TypeFragment,
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdCollapseTransition } from './td-collapse-transition.interface';
import './style/index';

export class TdCollapseTransition
  extends TypeFragment
  implements ITdCollapseTransition
{
  className: 'TdCollapseTransition';

  constructor(params: TransitionProps = {}) {
    super();
    this.className = 'TdCollapseTransition';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('collapse-transition');

    const reset = (el: RendererElement) => {
      el.style.maxHeight = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };

    // todo 应该对应 transtion 中的 on开头的方法
    const on = {
      onBeforeEnter(el?: RendererElement) {
        if (!el) return;
        if (!el?.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height) el.dataset.elExistsHeight = el.style.height;

        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },

      onEnter(el?: RendererElement) {
        if (!el) return;
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }

          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = 'hidden';
        });
      },

      onAfterEnter(el?: RendererElement) {
        if (!el) return;
        el.style.maxHeight = '';
        el.style.overflow = el.dataset.oldOverflow;
      },

      onEnterCancelled(el?: RendererElement) {
        if (!el) return;
        reset(el);
      },

      onBeforeLeave(el?: RendererElement) {
        if (!el) return;
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = 'hidden';
      },

      onLeave(el?: RendererElement) {
        if (!el) return;
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },

      onAfterLeave(el?: RendererElement) {
        if (!el) return;
        reset(el);
      },

      onLeaveCancelled(el?: RendererElement) {
        if (!el) return;
        reset(el);
      },
    };

    this.addChild(
      new Transition({
        name: ns.b(),
        ...on,
        // emits: on,
        slot: props.slot || props.slots?.default,
      })
    );
  }
}
