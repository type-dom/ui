import { isObject, isString, NOOP } from '@type-dom/utils';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { AutocompleteProps } from './td-autocomplete.interface';

export const autocompleteProps: AutocompleteProps = {
  valueKey: 'value',
  modelValue: '',
  debounce: 300,
  placement: 'bottom-start',
  fetchSuggestions: NOOP,
  popperClass: '',
  triggerOnFocus: true,
  selectWhenUnmatched: false,
  hideLoading: false,
  teleported: true,
  highlightFirstItem: false,
  fitInputWidth: false,
  clearable: false,
  disabled: false,
}

export const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item: Record<string, any>) => isObject(item),
}