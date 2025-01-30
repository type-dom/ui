// import {
//   getCurrentInstance,
//   inject,
//   onMounted,
//   onUnmounted,
//   reactive,
//   ref,
//   unref,
// } from 'vue'
// import { debugWarn, isUndefined } from '@element-plus/utils'
import { CAROUSEL_ITEM_NAME, carouselContextKey } from './constants';
import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
} from '@type-dom/framework';
import { debugWarn, isUndefined } from '@type-dom/utils';
import { CarouselItemProps } from './td-carousel-item.interface';
import { signal, unref } from '@type-dom/signals';

// import type { CarouselItemProps } from './carousel-item'

export const useCarouselItem = (props: CarouselItemProps) => {
  const carouselContext = inject(carouselContextKey)!;
  // instance
  const instance = getCurrentInstance()!;
  if (!carouselContext) {
    debugWarn(
      CAROUSEL_ITEM_NAME,
      'usage: <el-carousel></el-carousel-item></el-carousel>'
    );
  }

  if (!instance) {
    debugWarn(
      CAROUSEL_ITEM_NAME,
      'compositional hook can only be invoked inside setups'
    );
  }

  const carouselItemRef = signal<HTMLElement>();
  const hover = signal(false);
  const translate = signal(0);
  const scale = signal(1);
  const active = signal(false);
  const ready = signal(false);
  const inStage = signal(false);
  const animating = signal(false);

  // computed
  const { isCardType, isVertical, cardScale } = carouselContext;

  // methods

  function processIndex(index: number, activeIndex: number, length: number) {
    const lastItemIndex = length - 1;
    const prevItemIndex = activeIndex - 1;
    const nextItemIndex = activeIndex + 1;
    const halfItemIndex = length / 2;

    if (activeIndex === 0 && index === lastItemIndex) {
      return -1;
    } else if (activeIndex === lastItemIndex && index === 0) {
      return length;
    } else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) {
      return length + 1;
    } else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) {
      return -2;
    }
    return index;
  }

  function calcCardTranslate(index: number, activeIndex: number) {
    const parentWidth = unref(isVertical)
      ? carouselContext.root.get()?.offsetHeight || 0
      : carouselContext.root.get()?.offsetWidth || 0;

    if (inStage.get()) {
      return (parentWidth * ((2 - cardScale!) * (index - activeIndex) + 1)) / 4;
    } else if (index < activeIndex) {
      return (-(1 + cardScale!) * parentWidth) / 4;
    } else {
      return ((3 + cardScale!) * parentWidth) / 4;
    }
  }

  function calcTranslate(
    index: number,
    activeIndex: number,
    isVertical: boolean
  ) {
    const rootEl = carouselContext.root.get();
    if (!rootEl) return 0;

    const distance =
      (isVertical ? rootEl.offsetHeight : rootEl.offsetWidth) || 0;
    return distance * (index - activeIndex);
  }

  const translateItem = (
    index: number,
    activeIndex: number,
    oldIndex?: number
  ) => {
    const _isCardType = unref(isCardType);
    const carouselItemLength = carouselContext.items.get().length ?? Number.NaN;

    const isActive = index === activeIndex;
    if (!_isCardType && !isUndefined(oldIndex)) {
      animating.set(isActive || index === oldIndex);
    }

    if (!isActive && carouselItemLength > 2 && carouselContext.loop) {
      index = processIndex(index, activeIndex, carouselItemLength);
    }

    const _isVertical = unref(isVertical);
    active.set(isActive);

    if (_isCardType) {
      inStage.set(Math.round(Math.abs(index - activeIndex)) <= 1);
      translate.set(calcCardTranslate(index, activeIndex));
      scale.set(unref(active) ? 1 : cardScale!);
    } else {
      translate.set(calcTranslate(index, activeIndex, _isVertical));
    }

    ready.set(true);

    if (isActive && carouselItemRef.get()) {
      carouselContext.setContainerHeight(carouselItemRef.get()!.offsetHeight);
    }
  };

  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index = carouselContext.items
        .get()
        .findIndex(({ uid }) => uid === instance.uid);
      carouselContext.setActiveItem(index);
    }
  }

  // lifecycle
  onMounted(() => {
    carouselContext.addItem({
      props,
      states: {
        hover,
        translate,
        scale,
        active,
        ready,
        inStage,
        animating,
      },
      uid: instance.uid,
      translateItem,
    });
  });

  onUnmounted(() => {
    carouselContext.removeItem(instance.uid);
  });

  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick,
  };
};
