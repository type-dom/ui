import { CarouselProps } from './td-carousel.interface';
import { isNumber } from '@type-dom/utils';

export const carouselProps: CarouselProps = {
  /**
   * @description index of the initially active slide (starting from 0)
   */
  initialIndex: 0,
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  arrow: 'hover',
  cardScale: 0.83,
  loop: true,
  direction: 'horizontal',
  pauseOnHover: true,
};

export const carouselEmits = {
  /**
   * @description triggers when the active slide switches
   * @param current index of the new active slide
   * @param prev index of the old active slide
   */
  change: (current: number, prev: number) => [current, prev].every(isNumber),
};
