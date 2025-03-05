import { isNumber } from '@type-dom/utils';
import { ImageProps } from './td-image.interface';

export const imageProps: ImageProps = {
  src: '',
  fit: '',
  previewSrcList: [],
  initialIndex: 0,
  infinite: true,
  closeOnPressEscape: true,
  zoomRate: 1.2,
  minScale: 0.2,
  maxScale: 7,
  showProgress: false,
};

export const imageEmits = {
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event,
  switch: (val: number) => isNumber(val),
  close: () => true,
  show: () => true,
};
