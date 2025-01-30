import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdCarousel extends ITypeDiv {
  className: 'TdCarousel';
}

export interface CarouselProps extends TypeDivProps {
  /**
   * @description index of the initially active slide (starting from 0)
   *     default: 0,
   */
  initialIndex?: number;
  /**
   * @description height of the carousel
   *     default: '',
   */
  height?: string;
  /**
   * @description how indicators are triggered
   *     default: 'hover',
   */
  trigger?: 'hover' | 'click';
  /**
   * @description whether automatically loop the slides
   *     default: true,
   */
  autoplay?: boolean;
  /**
   * @description interval of the auto loop, in milliseconds
   *     default: 3000,
   */
  interval?: number;
  /**
   * @description position of the indicators
   *     default: '',
   */
  indicatorPosition?: '' | 'none' | 'outside';
  /**
   * @description when arrows are shown
   *     default: 'hover',
   */
  arrow?: 'always' | 'hover' | 'never';
  /**
   * @description type of the Carousel
   *     default: '',
   */
  type?: '' | 'card';
  /**
   * @description when type is card, scaled size of secondary cards
   *     default: 0.83,
   */
  cardScale?: number;
  /**
   * @description display the items in loop
   *     default: true,
   */
  loop?: boolean;
  /**
   * @description display direction
   *     default: 'horizontal',
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description pause autoplay when hover
   *     default: true,
   */
  pauseOnHover?: boolean;
  /**
   * @description infuse dynamism and smoothness into the carousel
   */
  motionBlur?: boolean;
}
