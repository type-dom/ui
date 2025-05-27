// import { placements } from '@popperjs/core'
// import { buildProps, definePropType } from '@element-plus/utils'
// import {
//   useAriaProps,
//   useEmptyValuesProps,
//   useSizeProp,
// } from '@element-plus/hooks'
// import { CircleClose } from '@element-plus/icons-vue'
import { ElCircleCloseSvg } from '@type-dom/svgs';
import { AnyFn } from '@type-dom/utils';

// import type { Component, ExtractPropTypes } from 'vue'
// import type { Options } from '@popperjs/core'
import type { ComputePositionConfig as Options } from '@type-dom/popper';
import type { Dayjs } from 'dayjs';
import {
  TypeDivProps,
  // TypeFragmentProps,
  TypeSvgSvg,
} from '@type-dom/framework';
import { Placement } from '@type-dom/popper';
import { ComponentSize } from '../../../../constants/size';
// import type { Placement } from '@element-plus/components/popper'
import { DisabledTimeListsProps } from '../props/shared';

export type SingleOrRange<T> = T | [T, T];
export type DateModelType = number | string | Date;
export type ModelValueType = SingleOrRange<DateModelType> | string[];
export type DayOrDays = SingleOrRange<Dayjs>;
export type DateOrDates = SingleOrRange<Date>;
export type UserInput = SingleOrRange<string | undefined>;
export type GetDisabledHours = (
  role: string,
  comparingDate?: Dayjs
) => number[];
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[];
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[];

export const timePickerDefaultProps: TimePickerDefaultProps = {
  popperClass: '',
  type: '',
  clearable: true,
  clearIcon: ElCircleCloseSvg,
  editable: true,
  prefixIcon: '',
  placeholder: '',
  modelValue: '',
  rangeSeparator: '-',
  // ...disabledTimeListsProps,
  shortcuts: [],
  tabindex: 0,
  validateEvent: true,
  placement: 'bottom',
  fallbackPlacements: ['bottom', 'top', 'right', 'left'],
  // ...useEmptyValuesProps,
  // ...useAriaProps(['ariaLabel']),
  showNow: true,
};

export interface TimePickerDefaultProps extends DisabledTimeListsProps {
  /**
   * @description same as `id` in native input
   */
  id?: string;
  /**
   * @description same as `name` in native input
   */
  name?: string;
  /**
   * @description custom class name for TimePicker's dropdown
   */
  popperClass?: string;
  /**
   * @description format of the displayed value in the input box
   */
  format?: string;
  /**
   * @description optional, format of binding value. If not specified, the binding value will be a Date object
   */
  valueFormat?: string;
  /**
   * @description optional, format of the date displayed value in TimePicker's dropdown
   */
  dateFormat?: string;
  /**
   * @description optional, format of the time displayed value in TimePicker's dropdown
   */
  timeFormat?: string;
  /**
   * @description type of the picker
   */
  type?: string;
  /**
   * @description whether to show clear button
   */
  clearable?: boolean;
  /**
   * @description Custom clear icon component
   */
  clearIcon?: string | typeof TypeSvgSvg;
  /**
   * @description whether the input is editable
   */
  editable?: boolean;
  /**
   * @description Custom prefix icon component
   */
  prefixIcon?: string | typeof TypeSvgSvg;
  /**
   * @description size of Input
   */
  size?: ComponentSize;
  /**
   * @description whether TimePicker is read only
   */
  readonly?: boolean;
  /**
   * @description whether TimePicker is disabled
   */
  disabled?: boolean;
  /**
   * @description placeholder in non-range mode
   */
  placeholder?: string;
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions?: Partial<Options>; // todo
  /**
   * @description binding value, if it is an array, the length should be 2
   */
  modelValue?: ModelValueType;
  /**
   * @description range separator
   */
  rangeSeparator?: string;
  /**
   * @description placeholder for the start date in range mode
   */
  startPlaceholder?: string;
  /**
   * @description placeholder for the end date in range mode
   */
  endPlaceholder?: string;
  /**
   * @description optional, default date of the calendar
   */
  defaultValue?: Date;
  /**
   * @description optional, the time value to use when selecting date range
   */
  defaultTime?: Date;
  /**
   * @description whether to pick a time range
   */
  isRange?: boolean;
  // ...disabledTimeListsProps,
  /**
   * @description a function determining if a date is disabled with that date as its parameter. Should return a Boolean
   */
  disabledDate?: AnyFn;
  /**
   * @description set custom className
   */
  cellClassName?: AnyFn;
  /**
   * @description an object array to set shortcut options
   */
  shortcuts?: Array<unknown>;
  /**
   * @description whether to pick time using arrow buttons
   */
  arrowControl?: boolean;
  /**
   * @description input tabindex
   */
  tabindex?: string | number;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description unlink two date-panels in range-picker
   */
  unlinkPanels?: boolean;
  /**
   * @description position of dropdown
   */
  placement?: Placement;
  /**
   * @description list of possible positions for dropdown
   */
  fallbackPlacements?: ('bottom' | 'top' | 'right' | 'left')[];
  // ...useEmptyValuesProps,
  // ...useAriaProps(['ariaLabel']),
  /**
   * @description whether to show the now button
   */
  showNow?: boolean;
}

export interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean;
  handleKeydownInput: (event: KeyboardEvent) => void;
  parseUserInput: (value: UserInput) => DayOrDays;
  formatToString: (value: DayOrDays) => UserInput;
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays;
  getDefaultValue: () => DayOrDays;
  panelReady: boolean;
  handleClear: () => void;
  handleFocusPicker?: () => void;
}

export interface TimePickerRangeTriggerProps extends TypeDivProps {
  id?: string[];
  // name?: string[];
  modelValue?: UserInput;
  startPlaceholder?: string;
  endPlaceholder?: string;
}
