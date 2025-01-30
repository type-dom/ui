import { PopperCoreConfigProps, PopperContentProps } from './content.interface';

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
