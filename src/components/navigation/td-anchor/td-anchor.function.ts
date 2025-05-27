import { signal } from '@type-dom/signals';
import {
  animateScrollTo,
  getElement,
  getOffsetTopDistance,
  getScrollElement,
} from '@type-dom/utils';
import { AnchorProps } from './td-anchor.interface';

const currentAnchor = signal<string | null>(null);
const containerEl = signal<HTMLElement | Window | null>(null); // ref<HTMLElement | Window>()
// const links: Record<string, HTMLElement> = {};

// let isScrolling = false;
const currentScrollTop = 0;

// const addLink = (state: AnchorLinkState) => {
//   links[state.href] = state.el;
// };
//
// const removeLink = (href: string) => {
//   delete links[href];
// };

const setCurrentAnchor = (href: string) => {
  const activeHref = currentAnchor.get();
  if (activeHref !== href) {
    currentAnchor.set(href);
    // emit('change', href)
  }
};

let clearAnimate: (() => void) | null = null;

const scrollToAnchor = (href: string, props?: AnchorProps) => {
  if (!containerEl.get()) return;
  const target = getElement(href);
  if (!target) return;
  if (clearAnimate) clearAnimate();
  // isScrolling = true;
  const scrollEle = getScrollElement(target, containerEl.get()!);
  const distance = getOffsetTopDistance(target, scrollEle);
  const max = scrollEle.scrollHeight - scrollEle.clientHeight;
  const to = Math.min(distance - (props?.offset || 0), max);
  clearAnimate = animateScrollTo(
    containerEl.get()!,
    currentScrollTop,
    to,
    props?.duration || 300,
    () => {
      // make sure it is executed after throttleByRaf's handleScroll
      setTimeout(() => {
        // isScrolling = false;
      }, 20);
    }
  );
};

export const scrollTo = (href?: string, config?: AnchorProps) => {
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
// const getCurrentHref = (props?: AnchorProps) => {
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
//   anchorTopList.sort((prev, preview) => prev.top - preview.top);
//
//   for (let i = 0; i < anchorTopList.length; i++) {
//     const item = anchorTopList[i];
//     const preview = anchorTopList[i + 1];
//
//     if (i === 0 && scrollTop === 0) {
//       return '';
//     }
//     if (item.top <= scrollTop && (!preview || preview.top > scrollTop)) {
//       return item.href;
//     }
//   }
// };
