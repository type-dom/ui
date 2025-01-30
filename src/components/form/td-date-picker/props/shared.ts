// import { buildProps, definePropType, isArray } from '@element-plus/utils'
// import { datePickTypes } from '@element-plus/constants'
//
// import type { ExtractPropTypes } from 'vue'
// import type { DatePickType } from '@element-plus/constants'
import type { Dayjs } from 'dayjs';
import { TypeProps } from '@type-dom/framework';
import { isArray } from '@type-dom/utils';
import { DatePickType } from '../../../../constants/date';

const selectionModes = [
  'date',
  'dates',
  'year',
  'years',
  'month',
  'months',
  'week',
  'range',
];

export type RangeState = {
  endDate: null | Dayjs;
  selecting: boolean;
};

export type DisabledDateType = (date: Date) => boolean;

export interface DatePickerSharedProps extends TypeProps {
  disabledDate?: DisabledDateType;
  date?: Dayjs; // required: true,
  minDate?: Dayjs;
  maxDate?: Dayjs;
  parsedValue?: Dayjs | Dayjs[];
  rangeState?: RangeState;
  // default: () => ({
  //   endDate: null,
  //   selecting: false,
  // }),
}

export const datePickerSharedProps: DatePickerSharedProps = {
  rangeState: {
    endDate: null,
    selecting: false,
  },
};

export interface PanelSharedProps extends TypeProps {
  type?: DatePickType;
  //   required: true,
  //   values: datePickTypes,
  // },
  dateFormat?: string;
  timeFormat?: string;
  showNow?: boolean; //default: true,
}

export const panelSharedProps: PanelSharedProps = {
  showNow: true,
};

export interface PanelRangeSharedProps {
  unlinkPanels?: boolean;
  parsedValue?: Dayjs[];
}

// todo 什么用？？
export type ISelectMode = string;
//   type: StringConstructor;
//   values: string[];
//   default: string;
// }

export const selectionModeWithDefault = (
  mode: (typeof selectionModes)[number]
): ISelectMode => {
  return mode;
};

export const rangePickerSharedEmits = {
  pick: (range: [Dayjs, Dayjs]) => isArray(range),
};

export type RangePickerSharedEmits = typeof rangePickerSharedEmits;
