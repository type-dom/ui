// import { buildProps } from '@element-plus/utils'
import {
  PanelRangeSharedProps,
  PanelSharedProps,
  panelSharedProps,
} from './shared';

// import type { ExtractPropTypes } from 'vue'

export const panelDateRangeProps: PanelDateRangeProps = {
  ...panelSharedProps,
  // ...panelRangeSharedProps,
  // visible: boolean,
} as const;

export interface PanelDateRangeProps
  extends PanelSharedProps,
    PanelRangeSharedProps {
  visible?: boolean;
}
