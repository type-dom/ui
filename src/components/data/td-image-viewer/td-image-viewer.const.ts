import { isNumber } from '@type-dom/utils';
import { ImageViewerProps } from './td-image-viewer.interface';

export const imageViewerProps: ImageViewerProps = {
  urlList: [],
  initialIndex: 0,
  infinite: true,
  closeOnPressEscape: true,
  zoomRate: 1.2,
  minScale: 0.2,
  maxScale: 7,
  showProgress: false,
};

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => isNumber(index),
  rotate: (deg: number) => isNumber(deg),
};
