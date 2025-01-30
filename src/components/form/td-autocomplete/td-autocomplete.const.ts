import { Awaitable, isObject, isString, NOOP } from '@type-dom/utils';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { AutocompleteProps } from './td-autocomplete.interface';

export type AutocompleteData = Record<string, any>[];
export type AutocompleteFetchSuggestionsCallback = (
  data: AutocompleteData
) => void;
export type AutocompleteFetchSuggestions =
  | ((
      queryString: string,
      cb: AutocompleteFetchSuggestionsCallback
    ) => Awaitable<AutocompleteData> | void)
  | AutocompleteData;

export const autocompleteProps: AutocompleteProps = {
  valueKey: 'value',
  modelValue: '',
  debounce: 300,
  placement: 'bottom-start',
  fetchSuggestions: NOOP,
  triggerOnFocus: true,
  selectWhenUnmatched: false,
  hideLoading: false,
  highlightFirstItem: false,
  fitInputWidth: false,
  clearable: false,
  disabled: false,
  // ...useAriaProps(['ariaLabel']),
};

export const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item: Record<string, any>) => isObject(item),
};
