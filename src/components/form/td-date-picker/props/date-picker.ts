// import { timePickerDefaultProps } from '@element-plus/components/time-picker'
// import { buildProps, definePropType } from '@element-plus/utils'
//
// import type { ExtractPropTypes } from 'vue'
import type { IDatePickerType } from '../date-picker.type';
import {
  timePickerDefaultProps,
  TimePickerDefaultProps,
} from '../../td-time-picker/common/props';

export const datePickerProps: DatePickerProps = {
  ...timePickerDefaultProps,
  /**
   * @description type of the picker
   */
  type: 'date',
} as const;

export interface DatePickerProps extends TimePickerDefaultProps {
  /**
   * @description type of the picker
   *   default: 'date',
   */
  type?: IDatePickerType;
}
