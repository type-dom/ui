import { Property } from '@type-dom/css-type';
import { ClassValue, ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdOverlay extends ITypeDiv {
  className: 'TdOverlay';
}

export interface OverlayProps extends TypeDivProps {
  mask?: boolean; // default: true,
  customMaskEvent?: boolean; // default: false,
  overlayClass?: ClassValue;
    // | string
    // | (string | undefined)[]
    // | Record<string, boolean | unknown>;
  //   type: definePropType<string | string[] | Record<string, boolean>>([ String, Array, Object ]),
  // },
  zIndex?: Property.ZIndex;

  emits?: {
    click: (event: MouseEvent) => void;
  };
}
