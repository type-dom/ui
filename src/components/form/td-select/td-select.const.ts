import { ElArrowDownSvg, ElCircleCloseSvg } from '@type-dom/svgs';
import { TdSelectProps } from './td-select.interface';

export const selectProps: TdSelectProps = {
  autocomplete: 'off',
  effect: 'light',
  noMatchText: 'No matching data',
  noDataText: 'No data',
  multipleLimit: 0,
  placeholder: 'Select',
  reserveKeyword: true,
  valueKey: 'value',
  maxCollapseTags: 1,
  persistent: true,
  clearIcon: ElCircleCloseSvg, // 同下
  suffixIcon: ElArrowDownSvg, // 必须是类，而不是对象；这样全局就只有一个了。
  tagType: 'info',
  validateEvent: true,
  placement: 'bottom-start',
};
