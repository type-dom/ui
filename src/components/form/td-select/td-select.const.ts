import { ElArrowDownSvg, ElCircleCloseSvg } from '@type-dom/svgs';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { scrollbarEmits } from '../../basic/td-scrollbar/td-scrollbar.const';
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
  tagEffect: 'light',
  validateEvent: true,
  showArrow: true,
  offset: 12,
  placement: 'bottom-start',
  fallbackPlacements: ['bottom-start', 'top-start', 'right', 'left'],
  tabindex: 0
};

export const selectEmits = {
  [UPDATE_MODEL_EVENT]: (_val: TdSelectProps['modelValue']) => true,
  [CHANGE_EVENT]: (_val: TdSelectProps['modelValue']) => true,
  'popup-scroll': scrollbarEmits.scroll,
  'remove-tag': (_val: unknown) => true,
  'visible-change': (_visible: boolean) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
