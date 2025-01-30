// import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedProps,
  datePickerSharedProps,
  ISelectMode,
  selectionModeWithDefault,
} from './shared';

// import type { ExtractPropTypes } from 'vue'

export const basicYearTableProps: BasicYearTableProps = {
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault('year'),
} as const;

export interface BasicYearTableProps extends DatePickerSharedProps {
  selectionMode: ISelectMode;
}
