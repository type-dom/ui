import { IUI, IUIConfig } from '../../../../ui/ui.interface';
import { IStyle } from '@type-dom/css-type';

export interface ITdPopperContent extends IUI {
  className: 'TdPopperContent';
}
const top = 'top';
const bottom = 'bottom';
const right = 'right';
const left = 'left';
type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;
type VariationPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end';
type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export type Placement = AutoPlacement | BasePlacement | VariationPlacement;
export interface IPopperCoreConfigProps extends IUIConfig {
  boundariesPadding?: number; // default: 0,
  //   default: undefined,
  fallbackPlacements?: Placement[];
  //   type: definePropType<Placement[]>(Array),
  // },
  gpuAcceleration?: boolean; // default: true,
  /**
   * @description offset of the Tooltip
   */
  offset?: number; //  default: 12,
  /**
   * @description position of Tooltip
   *     values: placements,
   *     default: 'bottom',
   */
  placement?: string;
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   *   //   default: () => ({}),
   */
  popperOptions?: Record<string, string>;
  //   type: definePropType<Partial<Options>>(Object),
  // },
  strategy?: string;
  //   values: POSITIONING_STRATEGIES,
  //   default: 'absolute',
  // },
}

export interface ITdPopperContentConfig extends IPopperCoreConfigProps {
  id?: string;
  contentStyle?: IStyle; // add by me todo
  // style: {
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  // className: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  effect?: string; // default: 'dark',
  visible?: boolean;
  enterable?: boolean; // default: true,
  pure?: boolean;
  focusOnShow?: boolean; // default: false,
  trapping?: boolean; // default: false,
  // popperClass: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  popperStyle?: IStyle;
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  referenceEl?: HTMLElement;
  triggerTargetEl?: HTMLElement;
  stopPopperMouseEvent?: boolean; // default: true,
  ariaLabel?: string; // default: undefined,
  virtualTriggering?: boolean;
  zIndex?: number;

  emits?: {
    mouseenter?: (evt: MouseEvent) => void; // todo 与events合并；
    mouseleave?: (evt: MouseEvent) => void;
    focus?: (evt: FocusEvent) => void;
    blur?: (evt: FocusEvent) => void;
    close?: () => void;
  }
}
