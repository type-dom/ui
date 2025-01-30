// import { buildProps, definePropType } from '@element-plus/utils'
//
// import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs';
import { TypeProps } from '@type-dom/framework';

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

export interface DisabledTimeListsProps extends TypeProps {
  /**
   * @description To specify the array of hours that cannot be selected
   */
  disabledHours?: GetDisabledHours;
  /**
   * @description To specify the array of minutes that cannot be selected
   */
  disabledMinutes?: GetDisabledMinutes;
  /**
   * @description To specify the array of seconds that cannot be selected
   */
  disabledSeconds?: GetDisabledSeconds;
}

export interface TimePanelSharedProps extends TypeProps {
  visible?: boolean;
  actualVisible?: boolean;
  format?: string;
}
