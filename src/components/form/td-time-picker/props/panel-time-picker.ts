import { TimePanelSharedProps } from './shared';

import type { Dayjs } from 'dayjs';

export interface PanelTimePickerProps extends TimePanelSharedProps {
  datetimeRole?: string;
  parsedValue?: Dayjs;
}
