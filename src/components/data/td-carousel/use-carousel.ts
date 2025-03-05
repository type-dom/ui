// import {
//   computed,
//   getCurrentInstance,
//   isVNode,
//   onBeforeUnmount,
//   onMounted,
//   provide,
//   ref,
//   shallowRef,
//   unref,
//   useSlots,
//   watch,
// } from 'vue'
// import { throttle } from 'lodash-unified'
// import { useResizeObserver } from '@vueuse/core'
// import { debugWarn, flattedChildren, isString } from '@element-plus/utils'
// import { useOrderedChildren } from '@element-plus/hooks'

// import type { SetupContext } from 'vue'
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  provide,
  useResizeObserver,
  useSlots,
} from '@type-dom/framework';
import { computed, signal, unref, watch } from '@type-dom/signals';
import { throttle } from 'lodash';
import { AnyFn, debugWarn, isString } from '@type-dom/utils';
import { useOrderedChildren } from '../../../hooks/use-ordered-children';
import type { CarouselItemContext } from './constants';
import { CAROUSEL_ITEM_NAME, carouselContextKey } from './constants';
import { CarouselProps } from './td-carousel.interface';

const THROTTLE_TIME = 300;

export const useCarousel = (
  props: CarouselProps,
  emit: AnyFn,
  componentName: string
) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
  } = useOrderedChildren<CarouselItemContext>(
    getCurrentInstance()!,
    CAROUSEL_ITEM_NAME
  );

  const slots = useSlots();

  // refs
  const activeIndex = signal(-1);
  const timer = signal<ReturnType<typeof setInterval> | null>(null);
  const hover = signal(false);
  const root = signal<HTMLDivElement>();
  const containerHeight = signal<number>(0);
  const isItemsTwoLength = signal(true);
  const isFirstCall = signal(true);
  const isTransitioning = signal(false);

  // computed
  const arrowDisplay = computed(
    () => props.arrow !== 'never' && !unref(isVertical)
  );

  const hasLabel = computed(() => {
    return items.get().some((item) => item.props.label.toString().length > 0);
  });

  const isCardType = computed(() => props.type === 'card');
  const isVertical = computed(() => props.direction === 'vertical');

  const containerStyle = computed(() => {
    if (props.height !== 'auto') {
      return {
        height: props.height,
      };
    }
    return {
      height: `${containerHeight.get()}px`,
      overflow: 'hidden',
    };
  });

  // methods
  const throttledArrowClick = throttle(
    (index: number) => {
      setActiveItem(index);
    },
    THROTTLE_TIME,
    { trailing: true }
  );

  const throttledIndicatorHover = throttle((index: number) => {
    handleIndicatorHover(index);
  }, THROTTLE_TIME);

  const isTwoLengthShow = (index: number) => {
    if (!isItemsTwoLength.get()) return true;
    return activeIndex.get() <= 1 ? index <= 1 : index > 1;
  };

  function pauseTimer() {
    if (timer.get()) {
      clearInterval(timer.get()!);
      timer.set(null);
    }
  }

  function startTimer() {
    if (props.interval! <= 0 || !props.autoplay || timer.get()) return;
    timer.set(setInterval(() => playSlides(), props.interval));
  }

  const playSlides = () => {
    if (!isFirstCall.get()) {
      isTransitioning.set(true);
    }
    isFirstCall.set(false);

    if (activeIndex.get() < items.get().length - 1) {
      activeIndex.set(activeIndex.get() + 1);
    } else if (props.loop) {
      activeIndex.set(0);
    } else {
      isTransitioning.set(false);
    }
  };

  function setActiveItem(index: number | string) {
    if (!isFirstCall.get()) {
      isTransitioning.set(true);
    }
    isFirstCall.set(false);

    if (isString(index)) {
      const filteredItems = items
        .get()
        .filter((item) => item.props.name === index);
      if (filteredItems.length > 0) {
        index = items.get().indexOf(filteredItems[0]);
      }
    }
    index = Number(index);
    if (Number.isNaN(index) || index !== Math.floor(index)) {
      debugWarn(componentName, 'index must be integer.');
      return;
    }
    const itemCount = items.get().length;
    const oldIndex = activeIndex.get();
    if (index < 0) {
      activeIndex.set(props.loop ? itemCount - 1 : 0);
    } else if (index >= itemCount) {
      activeIndex.set(props.loop ? 0 : itemCount - 1);
    } else {
      activeIndex.set(index);
    }
    if (oldIndex === activeIndex.get()) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }

  function resetItemPosition(oldIndex?: number) {
    items.get().forEach((item, index) => {
      item.translateItem(index, activeIndex.get(), oldIndex);
    });
  }

  function itemInStage(item: CarouselItemContext, index: number) {
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage) return false;
    const nextItemIndex = index + 1;
    const prevItemIndex = index - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = _items[nextItemIndex]?.states?.active;
    const isPrevItemActive = _items[prevItemIndex]?.states?.active;

    if ((index === lastItemIndex && isFirstItemActive) || isNextItemActive) {
      return 'left';
    } else if ((index === 0 && isLastItemActive) || isPrevItemActive) {
      return 'right';
    }
    return false;
  }

  function handleMouseEnter() {
    hover.set(true);
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }

  function handleMouseLeave() {
    hover.set(false);
    startTimer();
  }

  function handleTransitionEnd() {
    isTransitioning.set(false);
  }

  function handleButtonEnter(arrow: 'left' | 'right') {
    if (unref(isVertical)) return;
    items.get().forEach((item, index) => {
      if (arrow === itemInStage(item, index)) {
        item.states.hover.set(true);
      }
    });
  }

  function handleButtonLeave() {
    if (unref(isVertical)) return;
    items.get().forEach((item) => {
      item.states.hover.set(false);
    });
  }

  function handleIndicatorClick(index: number) {
    if (index !== activeIndex.get()) {
      if (!isFirstCall.get()) {
        isTransitioning.set(true);
      }
    }
    activeIndex.set(index);
  }

  function handleIndicatorHover(index: number) {
    if (props.trigger === 'hover' && index !== activeIndex.get()) {
      activeIndex.set(index);
      if (!isFirstCall.get()) {
        isTransitioning.set(true);
      }
    }
  }

  function prev() {
    setActiveItem(activeIndex.get() - 1);
  }

  function next() {
    setActiveItem(activeIndex.get() + 1);
  }

  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover) startTimer();
  }

  function setContainerHeight(height: number) {
    if (props.height !== 'auto') return;
    containerHeight.set(height);
  }

  // todo
  function PlaceholderItem() {
    // fix: https://github.com/element-plus/element-plus/issues/12139
    const defaultSlots = slots?.default;
    if (!defaultSlots) return null;

    // const flatSlots = flattedChildren(defaultSlots)
    //
    // const normalizeSlots = flatSlots.filter((slot) => {
    //   return isVNode(slot) && (slot.type as any).name === CAROUSEL_ITEM_NAME
    // })

    // if (normalizeSlots?.length === 2 && props.loop && !isCardType.get()) {
    //   isItemsTwoLength.set(true)
    //   return normalizeSlots
    // }
    isItemsTwoLength.set(false);
    return null;
  }

  // watch
  watch(
    () => activeIndex.get(),
    (current, prev) => {
      resetItemPosition(prev);
      if (isItemsTwoLength.get()) {
        current = current % 2;
        prev = prev! % 2;
      }
      if (prev! > -1) {
        emit('change', current, prev);
      }
    }
  );
  watch(
    () => props.autoplay,
    (autoplay) => {
      autoplay ? startTimer() : pauseTimer();
    }
  );
  watch(
    () => props.loop,
    () => {
      setActiveItem(activeIndex.get());
    }
  );

  watch(
    () => props.interval,
    () => {
      resetTimer();
    }
  );

  const resizeObserver = signal<ReturnType<typeof useResizeObserver>>();
  // lifecycle
  onMounted(() => {
    watch(
      () => items.get(),
      () => {
        if (items.get().length > 0) setActiveItem(props.initialIndex!);
      },
      {
        immediate: true,
      }
    );

    resizeObserver.set(
      useResizeObserver(root.get(), () => {
        resetItemPosition();
      })
    );
    startTimer();
  });

  onBeforeUnmount(() => {
    pauseTimer();
    if (root.get() && resizeObserver.get()) {
      resizeObserver.get()?.stop();
    }
  });

  // provide
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    cardScale: props.cardScale,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight,
  });

  return {
    root,
    activeIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    isTransitioning,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleTransitionEnd,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    throttledArrowClick,
    throttledIndicatorHover,
  };
};
