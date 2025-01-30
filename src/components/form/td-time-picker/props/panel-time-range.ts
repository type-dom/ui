import { TimePanelSharedProps } from './shared';
import type { Dayjs } from 'dayjs';

export interface PanelTimeRangeProps extends TimePanelSharedProps {
  parsedValue?: [Dayjs, Dayjs];
}
