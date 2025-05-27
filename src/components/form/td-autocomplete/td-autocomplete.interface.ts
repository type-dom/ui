import { Awaitable } from '@type-dom/utils';
import { Placement } from '@type-dom/popper';
import { ITypeFragment, TypeFragmentProps, } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';
import { TooltipContentProps } from '../../feedback/td-tooltip/content/content.interface';
import { autocompleteEmits } from './td-autocomplete.const';

export interface ITdAutoComplete extends ITypeFragment {
  className: 'TdAutoComplete';
}

export type AutocompleteData = Record<string, any>[]
export type AutocompleteFetchSuggestionsCallback = (
  data: AutocompleteData
) => void
export type AutocompleteFetchSuggestions =
  | ((
  queryString: string,
  cb: AutocompleteFetchSuggestionsCallback
) => Awaitable<AutocompleteData> | void)
  | AutocompleteData


export interface AutocompleteProps extends TypeFragmentProps {
  /**
   * @description key name of the input suggestion object for display
   *     default: 'value',
   */
  valueKey?: string,
  /**
   * @description binding value
   *     default: '',
   */
  modelValue?: string | number,
  vModel?: Ref<string | number>,
  /**
   * @description debounce delay when typing, in milliseconds
   *     default: 300,
   */
  debounce?: number,
  /**
   * @description placement of the popup menu
   *     values: [
   *       'top',
   *       'top-start',
   *       'top-end',
   *       'bottom',
   *       'bottom-start',
   *       'bottom-end',
   *     ],
   *     default: 'bottom-start',
   */
  placement?: Placement,
  /**
   * @description a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete
   *     default: NOOP,
   */
  fetchSuggestions?: AutocompleteFetchSuggestions,
  /**
   * @description custom class name for autocomplete's dropdown
   *     default: '',
   */
  popperClass?: string,
  /**
   * @description whether show suggestions when input focus
   *     default: true,
   */
  triggerOnFocus?: boolean,
  /**
   * @description whether to emit a `select` event on enter when there is no autocomplete match
   *     default: false,
   */
  selectWhenUnmatched?: boolean,
  /**
   * @description whether to hide the loading icon in remote search
   *     default: false,
   */
  hideLoading?: boolean,
  /**
   * @description whether select dropdown is teleported to the body
   */
  teleported?: TooltipContentProps['teleported'],
  /**
   * @description which select dropdown appends to
   */
  appendTo?: TooltipContentProps['appendTo'],
  /**
   * @description whether to highlight first item in remote search suggestions by default
   *     default: false,
   */
  highlightFirstItem?: boolean,
  /**
   * @description whether the width of the dropdown is the same as the input
   *     default: false,
   */
  fitInputWidth?: boolean,
  /**
   * @description whether to show clear button
   *     default: false,
   */
  clearable?: boolean,
  /**
   * @description whether to disable
   *     default: false,
   */
  disabled?: boolean,
  /**
   * @description same as `name` in native input
   */
  name?: string,
  // ...useAriaProps(['ariaLabel']),
}

export type AutocompleteEmits = typeof autocompleteEmits;
