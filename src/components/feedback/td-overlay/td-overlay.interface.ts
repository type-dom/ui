import { Property } from '@type-dom/css-type';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdOverlay extends IUI {
  className: 'TdOverlay';
}

export interface ITdOverlayConfig extends IUIConfig {
  mask?: boolean, // default: true,
  customMaskEvent?: boolean, // default: false,
  // overlayClass: {
  //   type: definePropType<string | string[] | Record<string, boolean>>([ String, Array, Object ]),
  // },
  zIndex?: Property.ZIndex;

  emits?: {
    click: (event: MouseEvent) => void;
  }
}
