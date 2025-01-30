// import { buildProps, definePropType } from '@element-plus/utils'
import { PanelSharedProps, panelSharedProps } from './shared';

// import type { ExtractPropTypes } from 'vue'
import type { Dayjs } from 'dayjs';

export const panelDatePickProps: PanelDatePickProps = {
  ...panelSharedProps,
  format: '',
};

export interface PanelDatePickProps extends PanelSharedProps {
  parsedValue?: Dayjs | Dayjs[];
  visible?: boolean;
  format?: string; //default: '',
}
