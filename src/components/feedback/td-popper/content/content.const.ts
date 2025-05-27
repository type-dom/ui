import { signal } from '@type-dom/signals';
import { PopperCoreConfigProps, PopperContentProps } from './content.interface';
// import { popperArrowProps } from '../arrow/arrow.const';

export const popperCoreConfigProps: PopperCoreConfigProps = {
  boundariesPadding: 0,
  gpuAcceleration: true,
  offset: 12,
  placement: 'bottom',
  strategy: 'absolute',
};

export const popperContentProps: PopperContentProps = {
  boundariesPadding: 0,
  gpuAcceleration: true,
  offset: 12,
  placement: 'bottom',
  strategy: 'absolute',
  // ...popperCoreConfigProps,
  // ...popperArrowProps,
  arrowOffset: signal(5),
  effect: 'dark',
  enterable: true,
  focusOnShow: false,
  trapping: false,
  stopPopperMouseEvent: true,
};

export const popperContentEmits = {
  mouseenter: (evt?: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt?: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true,
};
