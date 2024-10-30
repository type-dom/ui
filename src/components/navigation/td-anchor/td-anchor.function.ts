import { AnchorLinkState, ITdAnchorConfig } from './td-anchor.interface';
import { createProxy } from '@type-dom/framework';
import {
  animateScrollTo,
  getElement,
  getOffsetTopDistance,
  getScrollElement,
  getScrollTop,
  isUndefined,
  throttleByRaf
} from '@type-dom/utils';

const currentAnchor = createProxy(null);
const containerEl = createProxy(null); // ref<HTMLElement | Window>()
const links: Record<string, HTMLElement> = {};

let isScrolling = false;
let currentScrollTop = 0;

const addLink = (state: AnchorLinkState) => {
  links[state.href] = state.el;
};

const removeLink = (href: string) => {
  delete links[href];
};

const setCurrentAnchor = (href: string) => {
  const activeHref = currentAnchor.value;
  if (activeHref !== href) {
    currentAnchor.value = href;
    // emit('change', href)
  }
};

let clearAnimate: (() => void) | null = null;

const scrollToAnchor = (href: string, props?: ITdAnchorConfig) => {
  if (!containerEl.value) return;
  const target = getElement(href);
  if (!target) return;
  if (clearAnimate) clearAnimate();
  isScrolling = true;
  const scrollEle = getScrollElement(target, containerEl.value);
  const distance = getOffsetTopDistance(target, scrollEle);
  const max = scrollEle.scrollHeight - scrollEle.clientHeight;
  const to = Math.min(distance - (props?.offset || 0), max);
  clearAnimate = animateScrollTo(
    containerEl.value,
    currentScrollTop,
    to,
    props?.duration || 300,
    () => {
      // make sure it is executed after throttleByRaf's handleScroll
      setTimeout(() => {
        isScrolling = false;
      }, 20);
    }
  );
};

export const scrollTo = (href?: string, config?: ITdAnchorConfig) => {
  if (href) {
    setCurrentAnchor(href);
    scrollToAnchor(href, config);
  }
};

//
// const handleScroll = throttleByRaf(() => {
//   if (containerEl.value) {
//     currentScrollTop = getScrollTop(containerEl.value);
//   }
//   const currentHref = getCurrentHref();
//   if (isScrolling || isUndefined(currentHref)) return;
//   setCurrentAnchor(currentHref);
// });
//
//
// const getCurrentHref = (props?: ITdAnchorConfig) => {
//   if (!containerEl.value) return;
//   const scrollTop = getScrollTop(containerEl.value);
//   const anchorTopList: { top: number; href: string }[] = [];
//
//   for (const href of Object.keys(links)) {
//     const target = getElement(href);
//     if (!target) continue;
//     const scrollEle = getScrollElement(target, containerEl.value);
//     const distance = getOffsetTopDistance(target, scrollEle);
//     anchorTopList.push({
//       top: distance - (props?.offset || 0) - (props?.bound || 15),
//       href
//     });
//   }
//   anchorTopList.sort((prev, next) => prev.top - next.top);
//
//   for (let i = 0; i < anchorTopList.length; i++) {
//     const item = anchorTopList[i];
//     const next = anchorTopList[i + 1];
//
//     if (i === 0 && scrollTop === 0) {
//       return '';
//     }
//     if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
//       return item.href;
//     }
//   }
// };
