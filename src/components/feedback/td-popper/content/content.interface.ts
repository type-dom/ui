import { IUI, IUIConfig } from '../../../../ui/ui.interface';


export interface ITdPopperContent extends IUI {
  className: 'TdPopperContent'
}

export interface IPopperCoreConfigProps extends IUIConfig {
  boundariesPadding?: number, // default: 0,
  // fallbackPlacements: {
  //   type: definePropType<Placement[]>(Array),
  //   default: undefined,
  // },
  gpuAcceleration?: boolean, // default: true,
  /**
   * @description offset of the Tooltip
   */
  offset?: number, //  default: 12,
  /**
   * @description position of Tooltip
   *     values: placements,
   *     default: 'bottom',
   */
  placement?: string,
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  // popperOptions: {
  //   type: definePropType<Partial<Options>>(Object),
  //   default: () => ({}),
  // },
  strategy?:string,
  //   values: POSITIONING_STRATEGIES,
  //   default: 'absolute',
  // },
}

export interface ITdPopperContentConfig extends IPopperCoreConfigProps {
  id?: string,
  // style: {
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  // className: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  effect?: string, // default: 'dark',
  visible?: boolean,
  enterable?: boolean, // default: true,
  pure?: boolean,
  focusOnShow?: boolean, // default: false,
  trapping?: boolean, // default: false,
  // popperClass: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  // popperStyle: {
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  referenceEl?: HTMLElement;
  triggerTargetEl?: HTMLElement;
  stopPopperMouseEvent?: boolean, // default: true,
  ariaLabel?: string, // default: undefined,
  virtualTriggering?: boolean,
  zIndex?: number,
}
