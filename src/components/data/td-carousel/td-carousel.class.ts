import {
  arraySlot,
  Button,
  defineExpose,
  Div,
  LI,
  Span,
  SvgDefs,
  SvgFeGaussianBlur,
  SvgFilter,
  Transition,
  TypeDiv,
  UL,
} from '@type-dom/framework';

import { computed, Signal, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { CarouselProps, ITdCarousel } from './td-carousel.interface';
import { carouselEmits, carouselProps } from './td-carousel.const';
import { useCarousel } from './use-carousel';
import { ElArrowLeftSvg, ElArrowRightSvg, SvgSvg } from '@type-dom/svgs';

export class TdCarousel extends TypeDiv implements ITdCarousel {
  className: 'TdCarousel';
  override props: CarouselProps;
  activeIndex?: Signal<number>;
  setActiveItem?: (index: string | number) => void;
  prev?: () => void;
  next?: () => void;

  constructor(params: CarouselProps = {}) {
    super();
    this.className = 'TdCarousel';
    this.addEmits(carouselEmits);
    this.assignProps(carouselProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'TdCarousel';
    const props = this.props;
    const emit = this.emit;
    const {
      root,
      activeIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      isTransitioning,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      handleTransitionEnd,
      setActiveItem,
      prev,
      next,
      isTwoLengthShow,
      throttledArrowClick,
      throttledIndicatorHover,
    } = useCarousel(props, emit, COMPONENT_NAME);
    const ns = useNamespace('carousel');

    // const { t } = useLocale()

    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m('card'));
      }
      return classes;
    });

    const carouselContainer = computed(() => {
      const classes = [ns.e('container')];
      if (
        props.motionBlur &&
        unref(isTransitioning) &&
        items.get().length > 1
      ) {
        classes.push(
          unref(isVertical)
            ? `${ns.namespace.get()}-transitioning-vertical`
            : `${ns.namespace.get()}-transitioning`
        );
      }
      return classes;
    });

    // const indicatorsClasses = computed(() => {
    //   const classes = [
    //     ns.e('indicators'),
    //     ns.em('indicators', props.direction),
    //   ];
    //   if (unref(hasLabel)) {
    //     classes.push(ns.em('indicators', 'labels'));
    //   }
    //   if (props.indicatorPosition === 'outside') {
    //     classes.push(ns.em('indicators', 'outside'));
    //   }
    //   if (unref(isVertical)) {
    //     classes.push(ns.em('indicators', 'right'));
    //   }
    //   return classes;
    // });

    defineExpose({
      /** @description active slide index */
      activeIndex,
      /** @description manually switch slide, index of the slide to be switched to, starting from 0; or the `name` of corresponding `el-carousel-item` */
      setActiveItem,
      /** @description switch to the previous slide */
      prev,
      /** @description switch to the preview slide */
      next,
    });

    this.assignProps({
      refDom: root,
      attrObj: {
        class: carouselClasses,
      },
      events: {
        mouseenter: (evt) => {
          handleMouseEnter();
          evt?.stopPropagation();
        },
        mouseleave: (evt) => {
          handleMouseLeave();
          evt?.stopPropagation();
        },
      },
    });
    if (arrowDisplay.get()) {
      this.addChild(
        new Transition({
          name: 'carousel-arrow-left',
          slot: new Button({
            vShow:
              (props.arrow === 'always' || hover) &&
              (props.loop || activeIndex.get() > 0), // todo watch
            attrObj: {
              type: 'button',
              class: [ns.e('arrow'), ns.em('arrow', 'left')],
              // ariaLabel: t('el.carousel.leftArrow')
            },
            events: {
              click: (evt) => {
                throttledArrowClick(activeIndex.get() - 1);
                evt?.stopPropagation();
              },
              mouseenter: () => handleButtonEnter('left'),
              mouseleave: handleButtonLeave,
            },
            slot: new TdIcon({
              slot: new ElArrowLeftSvg(),
            }),
          }),
        })
      );
    }
    if (arrowDisplay.get()) {
      this.addChild(
        new Transition({
          name: 'carousel-arrow-right',
          slot: new Button({
            vShow:
              (props.arrow === 'always' || hover) &&
              (props.loop || activeIndex.get() < items.get().length - 1),
            attrObj: {
              type: 'button',
              class: [ns.e('arrow'), ns.em('arrow', 'right')],
              // ariaLabel: t('el.carousel.rightArrow')
            },
            events: {
              click: (evt) => {
                throttledArrowClick(activeIndex.get() + 1);
                evt?.stopPropagation();
              },
              mouseenter: () => handleButtonEnter('right'),
              mouseleave: handleButtonLeave,
            },
            slot: new TdIcon({
              slot: new ElArrowRightSvg(),
            }),
          }),
        })
      );
    }

    this.addChild(
      new Div({
        class: carouselContainer,
        styleObj: containerStyle,
        emits: {
          transitionend: handleTransitionEnd,
        },
        slot: [
          // new PlaceholderItem(),
          ...arraySlot(props.slot || props.slots?.default),
        ],
      })
    );
    if (props.indicatorPosition !== 'none') {
      this.addChild(
        new UL({
          slot: items.get().map((item, index) => {
            return new LI({
              vShow: isTwoLengthShow(index),
              class: computed(() => [
                ns.e('indicator'),
                ns.em('indicator', props.direction),
                ns.is('active', index === activeIndex.get()),
              ]),
              events: {
                mouseenter: () => throttledIndicatorHover(index),
                click: (evt) => {
                  handleIndicatorClick(index);
                  evt?.stopPropagation();
                },
              },
              slot: new Button({
                class: ns.e('button'),
                // ariaLabel: t('el.carousel.indicator', { index: index + 1 })
                slot: new Span({
                  vIf: hasLabel,
                  slot: item.props.label,
                }),
              }),
            });
          }),
        })
      );
    }
    if (props.motionBlur) {
      this.addChild(
        new SvgSvg({
          styleObj: {
            display: 'none',
          },
          slot: new SvgDefs({
            slot: [
              //   todo
              new SvgFilter({
                attrObj: {
                  id: 'elCarouselHorizontal',
                },
                slot: new SvgFeGaussianBlur({
                  attrObj: {
                    in: 'SourceGraphic',
                    stdDeviation: '12,0',
                  },
                }),
              }),
              new SvgFilter({
                attrObj: {
                  id: 'elCarouselVertical',
                },
                slot: new SvgFeGaussianBlur({
                  attrObj: {
                    in: 'SourceGraphic',
                    stdDeviation: '0,1o',
                  },
                }),
              }),
            ],
          }),
        })
      );
    }
  }
}
