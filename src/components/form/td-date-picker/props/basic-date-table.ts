// import { buildProps, definePropType } from '@element-plus/utils'
import {
  DatePickerSharedProps,
  datePickerSharedProps,
  ISelectMode,
  selectionModeWithDefault,
} from './shared';

// import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs';

export const basicDateTableProps: BasicDateTableProps = {
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault('date'),
};

export const basicDateTableEmits = ['changerange', 'pick', 'select'];

export interface BasicDateTableProps extends DatePickerSharedProps {
  // ...datePickerSharedProps,
  cellClassName?: (date: Date) => string;
  showWeekNumber?: boolean;
  selectionMode?: ISelectMode;
}

export type BasicDateTableEmits = typeof basicDateTableEmits;

export type RangePickerEmits = { minDate: Dayjs; maxDate: null };
export type DatePickerEmits = Dayjs;
export type DatesPickerEmits = Dayjs[];
export type MonthsPickerEmits = Dayjs[];
export type YearsPickerEmits = Dayjs[];
export type WeekPickerEmits = {
  year: number;
  week: number;
  value: string;
  date: Dayjs;
};

export type DateTableEmits =
  | RangePickerEmits
  | DatePickerEmits
  | DatesPickerEmits
  | WeekPickerEmits;
