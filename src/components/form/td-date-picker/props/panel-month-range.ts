// import { buildProps } from '@element-plus/utils'
import { PanelRangeSharedProps } from './shared';

// import type { ExtractPropTypes } from 'vue'

// export const panelMonthRangeProps = buildProps({
//   // ...panelRangeSharedProps,
// } as const)

export const panelMonthRangeEmits = [
  'pick',
  'set-picker-option',
  'calendar-change',
];

export type PanelMonthRangeProps = PanelRangeSharedProps;
