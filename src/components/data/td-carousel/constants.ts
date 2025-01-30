// import type { InjectionKey, Ref } from 'vue'
//
// import type { CarouselItemProps } from './carousel-item'

import { Ref, Signal } from '@type-dom/signals';
import { CarouselItemProps } from './td-carousel-item.interface';
import { InjectionKey } from '@type-dom/framework';

export type CarouselItemStates = {
  hover: Signal<boolean>;
  translate: Signal<number>;
  scale: Signal<number>;
  active: Signal<boolean>;
  ready: Signal<boolean>;
  inStage: Signal<boolean>;
  animating: Signal<boolean>;
};

export type CarouselItemContext = {
  props: CarouselItemProps;
  states: CarouselItemStates;
  uid: number;
  translateItem: (
    index: number,
    activeIndex: number,
    oldIndex?: number
  ) => void;
};

export type CarouselContext = {
  root: Ref<HTMLElement | undefined>;
  items: Ref<CarouselItemContext[]>;
  isCardType: Ref<boolean>;
  isVertical: Ref<boolean>;
  loop?: boolean;
  cardScale?: number;
  addItem: (item: CarouselItemContext) => void;
  removeItem: (uid: number) => void;
  setActiveItem: (index: number) => void;
  setContainerHeight: (height: number) => void;
};

export const carouselContextKey: InjectionKey<CarouselContext> =
  Symbol('carouselContextKey');

export const CAROUSEL_ITEM_NAME = 'ElCarouselItem';
