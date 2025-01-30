import { IStyle } from '@type-dom/css-type';
import { Placement, Strategy } from '@type-dom/popper';
import {
  IEmits,
  TypeProps,
  ITypeDiv,
  TypeDivProps,
  TypeHtml,
  StyleValue,
  ISlotRaw,
} from '@type-dom/framework';
import { MaybeRef, Signal } from '@type-dom/signals';
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

type ClassObjectType = Record<string, boolean>;
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

export interface PopperContentProps extends PopperCoreConfigProps {
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
  popperClass?: ClassType;
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  popperStyle?: StyleValue;
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  referenceEl?: TypeHtml;
  triggerTargetEl?: TypeHtml;
  stopPopperMouseEvent?: boolean; // default: true,
  ariaLabel?: MaybeRef<string>; // default: undefined,
  virtualTriggering?: boolean;
  zIndex?: number;

  // emits?: ITdPopperContentEmits;
  slot?: (arg?: any) => ISlotRaw | ISlotRaw[];
}

export type PopperContentEmits = typeof popperContentEmits;
