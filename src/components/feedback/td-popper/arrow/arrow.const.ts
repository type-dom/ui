import { signal } from '@type-dom/signals';
import { PopperArrowProps } from './arrow.interface';

export const popperArrowProps: PopperArrowProps = {
  arrowOffset: signal(5),
};
