import { OverlayProps } from './td-overlay.interface';

export const overlayProps: OverlayProps = {
  mask: true,
};

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};
