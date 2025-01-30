import { Div, TypeDiv } from '@type-dom/framework';
import {
  CarouselItemProps,
  ITdCarouselItem,
} from './td-carousel-item.interface';
import { useNamespace } from '../../../hooks/use-namespace';
import { useCarouselItem } from './use-carousel-item';
import { computed, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class TdCarouselItem extends TypeDiv implements ITdCarouselItem {
  className: 'TdCarouselItem';
  override props: CarouselItemProps;

  constructor(params: CarouselItemProps) {
    super();
    this.className = 'TdCarouselItem';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('carousel');

    // inject
    const {
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
    } = useCarouselItem(props);

    const itemKls = computed(() => [
      ns.e('item'),
      ns.is('active', active.get()),
      ns.is('in-stage', inStage.get()),
      ns.is('hover', hover.get()),
      ns.is('animating', animating.get()),
      {
        [ns.em('item', 'card')]: isCardType.get(),
        [ns.em('item', 'card-vertical')]: isCardType.get() && isVertical.get(),
      },
    ]);

    const itemStyle = computed<IStyle>(() => {
      const translateType = `translate${unref(isVertical) ? 'Y' : 'X'}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale];

      return {
        transform,
      };
    });

    this.assignProps({
      vShow: ready,
      refDom: carouselItemRef,
      class: itemKls,
      styleObj: itemStyle,
      events: {
        click: handleItemClick,
      },
    });
    if (isCardType) {
      this.addChild(
        new Div({
          vShow: !active,
          class: ns.e('mask'),
        })
      );
    }
    this.slotChildren(props.slot || props.slots?.default);
  }
}
