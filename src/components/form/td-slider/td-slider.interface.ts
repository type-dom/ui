import { AnyFn, TypeProps, ITypeDiv } from '@type-dom/framework';
import { Placement } from '@type-dom/popper';
import { isArray, isNumber } from '@type-dom/utils';

import { Arrayable } from '../../../../../utils/src/ui/typescript';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { ComponentSize } from '../../../constants/size';
import { ITdSliderMarkerConfig } from './td-slider-marker';

export interface ITdSlider extends ITypeDiv {
  className: 'TdSlider';
}

type SliderMarks = Record<number, string | ITdSliderMarkerConfig['mark']>;

export interface SliderInitData {
  firstValue: number;
  secondValue: number;
  oldValue?: Arrayable<number>;
  dragging: boolean;
  sliderSize: number;
}

export interface ITdSliderConfig extends TypeProps {
  /**
   * @description binding value
   */
  modelValue?: number | number[];
  id?: string;
  /**
   * @description minimum value
   */
  min?: number;
  /**
   * @description maximum value
   */
  max?: number;
  /**
   * @description step size
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
  // ...useAriaProps(['ariaLabel']),
}

const isValidValue = (value: Arrayable<number>) =>
  isNumber(value) || (isArray(value) && value.every(isNumber));
export const sliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue,
};
