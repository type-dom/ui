// import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedProps,
  datePickerSharedProps,
  ISelectMode,
  selectionModeWithDefault,
} from './shared';

// import type { ExtractPropTypes } from 'vue'

export const basicMonthTableProps: BasicMonthTableProps = {
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault('month'),
};

export interface BasicMonthTableProps extends DatePickerSharedProps {
  selectionMode: ISelectMode;
}
