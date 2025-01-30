import { ITypeSpan, TypeSpanProps } from '@type-dom/framework';
import { Signal } from '@type-dom/signals';

export interface ITdPopperArrow extends ITypeSpan {
  className: 'TdPopperArrow';
}

export interface PopperArrowProps extends TypeSpanProps {
  /**
   *     default: 5,
   */
  arrowOffset?: Signal<number>;
}
