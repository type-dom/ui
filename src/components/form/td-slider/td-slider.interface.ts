import { TypeProps, ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { Placement } from '@type-dom/popper';
import { MaybeRef, Ref, Signal } from '@type-dom/signals';
import { AnyFn, Arrayable, isArray, isNumber } from '@type-dom/utils';

import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { ComponentSize } from '../../../constants/size';
import { SliderMarkerProps } from './mark/mark.interface';

export interface ITdSlider extends ITypeDiv {
  className: 'TdSlider';
}

type SliderMarks = Record<number, string | SliderMarkerProps['mark']>;

export interface SliderInitData {
  firstValue: Signal<number>;
  secondValue: Signal<number>;
  oldValue: Arrayable<number>;
  dragging: boolean;
  sliderSize: Signal<number>;
}

export interface SliderProps extends TypeDivProps {
  /**
   * @description binding value
   */
  modelValue?: number | number[];
  vModel?: Ref<number | number[]>; // add by me
  id?: string;
  /**
   * @description minimum value
   */
  min?: MaybeRef<number>;
  /**
   * @description maximum value
   */
  max?: MaybeRef<number>;
  /**
   * @description step size
   * default: 1
   */
  step?: number;
  /**
   * @description whether to display an input box, works when `range` is false
   */
  showInput?: boolean;
  /**
   * @description whether to display control buttons when `show-input` is true
   */
  showInputControls?: boolean;
  /**
   * @description size of the slider wrapper, will not work in vertical mode
   */
  size?: ComponentSize;
  /**
   * @description size of the input box, when set `size`, the default is the value of `size`
   */
  inputSize?: ComponentSize;
  /**
   * @description whether to display breakpoints
   */
  showStops?: boolean;
  /**
   * @description whether to display tooltip value
   */
  showTooltip?: boolean;
  /**
   * @description format to display tooltip value
   */
  formatTooltip?: AnyFn;
  /**
   * @description whether Slider is disabled
   */
  disabled?: boolean;
  /**
   * @description whether to select a range
   */
  range?: boolean;
  /**
   * @description vertical mode
   */
  vertical?: boolean;
  /**
   * @description slider height, required in vertical mode
   */
  height?: string;
  /**
   * @description debounce delay when typing, in milliseconds, works when `show-input` is true
   */
  debounce?: number;
  /**
   * @description when `range` is true, screen reader label for the start of the range
   */
  rangeStartLabel?: string;
  /**
   * @description when `range` is true, screen reader label for the end of the range
   */
  rangeEndLabel?: string;
  /**
   * @description format to display the `aria-valuenow` attribute for screen readers
   */
  formatValueText?: AnyFn;
  /**
   * @description custom class name for the tooltip
   */
  tooltipClass?: string;
  /**
   * @description position of Tooltip
   */
  placement?: Placement;
  /**
   * @description marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style
   */
  marks?: SliderMarks;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description when slider tooltip inactive and `persistent` is `false` , popconfirm will be destroyed. `persistent` always be `false` when `show-tooltip ` is `false`
   */
  persistent?: boolean,
  //   default: true,
  // },
  // ...useAriaProps(['ariaLabel']),
}

const isValidValue = (value: Arrayable<number>) =>
  isNumber(value) || (isArray(value) && value.every(isNumber));
export const sliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue,
};
