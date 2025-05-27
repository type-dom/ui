// import { buildProps, definePropType } from '@element-plus/utils'
import { DisabledTimeListsProps } from '../props/shared';

// import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs';

export interface BasicTimeSpinnerProps extends DisabledTimeListsProps {
  role?: string; //required: true,
  spinnerDate?: Dayjs; // required: true,
  showSeconds?: boolean;
  arrowControl?: boolean;
  amPmMode?: 'a' | 'A' | '';
}

export const basicTimeSpinnerProps: BasicTimeSpinnerProps = {
  showSeconds: true,
};
