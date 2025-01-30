import {
  defineExpose,
  Div,
  I,
  onMounted,
  provide,
  TypeDiv,
  TypeHtml,
  useEventListener,
} from '@type-dom/framework';
import { ITdAnchor, AnchorProps, AnchorLinkState } from './td-anchor.interface';
import { scrollTo } from './td-anchor.function';
import { anchorEmits, anchorProps } from './td-anchor.const';
import { computed, signal, watch } from '@type-dom/signals';
import { useNamespace } from 'libs/ui/src/hooks/use-namespace';
import {
  animateScrollTo,
  getElement,
  getOffsetTopDistance,
  getScrollElement,
  getScrollTop,
  isUndefined,
  isWindow,
  throttleByRaf,
} from '@type-dom/utils';
import { anchorKey } from './constants';

export class TdAnchor extends TypeDiv implements ITdAnchor {
  className: 'TdAnchor';
  override props: AnchorProps;
  scrollTo?: (href?: string) => void;

  constructor(params: AnchorProps = {}) {
    super();
    this.className = 'TdAnchor';
    this.attr.addObj({
      name: 'td-anchor',
    });

    this.addEmits(anchorEmits);
    this.assignProps(anchorProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const currentAnchor = signal('');
    const anchorRef = signal<HTMLElement | undefined>(undefined);
    const markerRef = signal<HTMLElement | undefined>(undefined);
    const containerEl = signal<HTMLElement | Window>();

    const links: Record<string, HTMLElement> = {};
    let isScrolling = false;
    let currentScrollTop = 0;

    const ns = useNamespace('anchor');

    const cls = computed(() => [
      ns.b(),
      props.type === 'underline' ? ns.m('underline') : '',
      ns.m(props.direction),
    ]);

    const addLink = (state: AnchorLinkState) => {
      links[state.href] = state.el;
    };

    const removeLink = (href: string) => {
      delete links[href];
    };

    const setCurrentAnchor = (href: string) => {
      const activeHref = currentAnchor.get();
      if (activeHref !== href) {
        currentAnchor.set(href);
        emit('change', href);
      }
    };

    let clearAnimate: (() => void) | null = null;

    const scrollToAnchor = (href: string) => {
      if (!containerEl.get()) return;
      const target = getElement(href);
      if (!target) return;
      if (clearAnimate) clearAnimate();
      isScrolling = true;
      const scrollEle = getScrollElement(target, containerEl.get()!);
      const distance = getOffsetTopDistance(target, scrollEle);
      const max = scrollEle.scrollHeight - scrollEle.clientHeight;
      const to = Math.min(distance - props.offset!, max);
      clearAnimate = animateScrollTo(
        containerEl.get()!,
        currentScrollTop,
        to,
        props.duration!,
        () => {
          // make sure it is executed after throttleByRaf's handleScroll
          setTimeout(() => {
            isScrolling = false;
          }, 20);
        }
      );
    };

    const scrollTo = (href?: string) => {
      if (href) {
        setCurrentAnchor(href);
        scrollToAnchor(href);
      }
    };

    const handleClick = (e: MouseEvent, href?: string) => {
      emit('click', e, href);
      scrollTo(href);
    };

    const handleScroll = throttleByRaf(() => {
      if (containerEl.get()) {
        currentScrollTop = getScrollTop(containerEl.get()!);
      }
      const currentHref = getCurrentHref();
      if (isScrolling || isUndefined(currentHref)) return;
      setCurrentAnchor(currentHref);
    });

    const getCurrentHref = () => {
      if (!containerEl.get()) return;
      const scrollTop = getScrollTop(containerEl.get()!);
      const anchorTopList: { top: number; href: string }[] = [];

      for (const href of Object.keys(links)) {
        const target = getElement(href);
        if (!target) continue;
        const scrollEle = getScrollElement(target, containerEl.get()!);
        const distance = getOffsetTopDistance(target, scrollEle);
        anchorTopList.push({
          top: distance - props.offset! - props.bound!,
          href,
        });
      }
      anchorTopList.sort((prev, next) => prev.top - next.top);
      for (let i = 0; i < anchorTopList.length; i++) {
        const item = anchorTopList[i];
        const next = anchorTopList[i + 1];

        if (i === 0 && scrollTop === 0) {
          return props.scrollTop ? item.href : '';
        }
        if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
          return item.href;
        }
      }
      return;
    };

    const getContainer = () => {
      const el = getElement(props.container);
      if (!el || isWindow(el)) {
        containerEl.set(window);
      } else {
        containerEl.set(el);
      }
    };

    useEventListener(containerEl, 'scroll', handleScroll);

    const markerStyle = computed(() => {
      if (!anchorRef.get() || !markerRef.get() || !currentAnchor.get())
        return {};
      const currentLinkEl = links[currentAnchor.get()];
      if (!currentLinkEl) return {};
      const anchorRect = anchorRef.get()?.getBoundingClientRect();
      const markerRect = markerRef.get()?.getBoundingClientRect();
      const linkRect = currentLinkEl.getBoundingClientRect();

      if (props.direction === 'horizontal') {
        const left = linkRect.left - anchorRect!.left;
        return {
          left: `${left}px`,
          width: `${linkRect.width}px`,
          opacity: 1,
        };
      } else {
        const top =
          linkRect.top -
          anchorRect!.top +
          (linkRect.height - markerRect!.height) / 2;
        return {
          top: `${top}px`,
          opacity: 1,
        };
      }
    });

    onMounted(() => {
      getContainer();
      const hash = decodeURIComponent(window.location.hash);
      const target = getElement(hash);
      if (target) {
        scrollTo(hash);
      } else {
        handleScroll();
      }
    });

    watch(
      () => props.container,
      () => {
        getContainer();
      }
    );

    provide(anchorKey, {
      ns,
      direction: props.direction!,
      currentAnchor,
      addLink,
      removeLink,
      handleClick,
    });

    defineExpose({
      scrollTo,
    });

    this.assignProps({
      refDom: anchorRef,
    });
    this.attr.addClass(cls);
    this.addChild(
      new Div({
        vIf: props.marker,
        refDom: markerRef,
        class: ns.e('marker'),
        styleObj: markerStyle,
      })
    );
    this.addChild(
      new Div({
        class: ns.e('list'),
        slot: this.props.slot || props.slots?.default,
      })
    );
  }
}
