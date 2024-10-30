import { IPopperCoreConfigProps, ITdPopperContentConfig } from './content.interface';

export const popperCoreConfigProps: IPopperCoreConfigProps = {
  boundariesPadding:  0,
  // fallbackPlacements: undefined,
  gpuAcceleration: true,
  /**
   * @description offset of the Tooltip
   */
  offset: 12,
  /**
   * @description position of Tooltip
   */
  placement: 'bottom',
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  // popperOptions:  () => ({}),
  strategy: 'absolute',
};


export const popperContentProps: ITdPopperContentConfig = {
  ...popperCoreConfigProps,
  // style: {
  //   type: definePropType<StyleValue>([String, Array, Object]),
  // },
  // className: {
  //   type: definePropType<ClassType>([String, Array, Object]),
  // },
  effect:'dark',
  enterable: true,
  focusOnShow: false,
  trapping: false,
  stopPopperMouseEvent: true,
};
