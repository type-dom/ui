import { IStyle } from '@type-dom/css-type';
import { Placement, Strategy } from '@type-dom/popper';
import { TypeProps, ITypeDiv, StyleValue } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { PopperArrowProps } from '../arrow/arrow.interface';
import { popperContentEmits } from './content.const';

export interface ITdPopperContent extends ITypeDiv {
  className: 'TdPopperContent';
}

// const top = 'top';
// const bottom = 'bottom';
// const right = 'right';
// const left = 'left';
// type BasePlacement = typeof top | typeof bottom | typeof right | typeof left;
// type VariationPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end';
// type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
// export type Placement = AutoPlacement | BasePlacement | VariationPlacement;

type ClassObjectType = Record<string, boolean | unknown>;
type ClassType = string | ClassObjectType | (ClassType | undefined)[];

export interface PopperCoreConfigProps extends TypeProps {
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
  placement?: Placement;
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   *   //   default: () => ({}),
   */
  popperOptions?: Record<string, any>;
  //   type: definePropType<Partial<Options>>(Object),
  // },
  strategy?: Strategy;
  //   values: POSITIONING_STRATEGIES,
  //   default: 'absolute',
  // },
}

export interface PopperContentBaseProps  {
  id?: MaybeRef<string>;
  contentStyle?: IStyle; // add by me todo
  style?: StyleValue;
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  // className: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  effect?: 'dark' | 'light' | string; // default: 'dark',
  visible?: MaybeRef<boolean> | null; // why must be null?
  enterable?: boolean; // default: true,
  pure?: boolean;
  focusOnShow?: boolean; // default: false,
  trapping?: boolean; // default: false,
  popperClass?: MaybeRef<ClassType>;
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  popperStyle?: StyleValue;
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  referenceEl?: HTMLElement;
  triggerTargetEl?: HTMLElement;
  stopPopperMouseEvent?: boolean; // default: true,
  virtualTriggering?: boolean;
  zIndex?: number;
  ariaLabel?: MaybeRef<string>; // default: undefined,

  // emits?: ITdPopperContentEmits;
  // slot?:  (arg?: any) => ISlotRaw | ISlotRaw[];
}
export type PopperContentProps = PopperCoreConfigProps & PopperArrowProps & PopperContentBaseProps;
export type PopperContentEmits = typeof popperContentEmits;
