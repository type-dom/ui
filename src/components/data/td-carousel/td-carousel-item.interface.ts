import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdCarouselItem extends ITypeDiv {
  className: 'TdCarouselItem';
}

export interface CarouselItemProps extends TypeDivProps {
  /**
   * @description name of the item, can be used in `setActiveItem`
   * default: ''
   */
  name: string;
  /**
   * @description text content for the corresponding indicator
   *     default: '',
   */
  label: string | number;
}
