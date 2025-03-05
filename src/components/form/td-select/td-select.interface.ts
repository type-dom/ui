import { ComputePositionConfig, Placement } from '@type-dom/popper';
import { ISlotItem, ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef, Ref, ToRefs } from '@type-dom/signals';
import { ElArrowDownSvg, ElCircleCloseSvg } from '@type-dom/svgs';
import { AnyFn, IPrimitive } from '@type-dom/utils';

import { ComponentSize } from '../../../constants/size';
import { IType } from '../../../styles';
import { TooltipContentProps } from '../../feedback/td-tooltip/content/content.interface';
import { CheckboxValueType } from '../td-checkbox/td-checkbox.interface';
import { TdOption } from '../td-option/td-option.class';
import { TdOptionGroup } from '../td-option-group/td-option-group.class';
import { OptionGroupProps } from '../td-option-group/td-option-group.interface';

export interface ITdSelect extends ITypeDiv {
  className: 'TdSelect';
}

export interface TdSelectProps extends TypeDivProps {
  /**
   * @description the name attribute of select input
   */
  name?: string;
  /**
   * @description native input id
   */
  id?: string;
  /**
   * @description binding value
   *     default: undefined,
   */
  modelValue?: IPrimitive | object | CheckboxValueType[];
  /**
   * @description the autocomplete attribute of select input
   *     default: 'off',
   */
  autocomplete?: string;
  /**
   * @description for non-filterable Select, this prop decides if the option menu pops up when the input is focused
   */
  automaticDropdown?: boolean;
  /**
   * @description size of Input
   */
  size?: ComponentSize;
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   *     default: 'light',
   */
  effect?: 'light' | 'dark' | string;
  /**
   * @description whether Select is disabled
   */
  disabled?: boolean;
  /**
   * @description whether select can be cleared
   */
  clearable?: boolean;
  /**
   * @description whether Select is filterable
   */
  filterable?: boolean;
  /**
   * @description whether creating new items is allowed. To use this, `filterable` must be true
   */
  allowCreate?: boolean;
  /**
   * @description whether Select is loading data from server
   */
  loading?: MaybeRef<boolean>;
  /**
   * @description custom class name for Select's dropdown
   *     default: '',
   */
  popperClass?: string;
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions?: Partial<ComputePositionConfig>;
  //   type: definePropType<Partial<Options>>(Object),
  //   default: () => ({} as Partial<Options>),
  // },
  /**
   * @description whether options are loaded from server
   */
  remote?: boolean;
  /**
   * @description displayed text while loading data from server, default is 'Loading'
   */
  loadingText?: string;
  /**
   * @description displayed text when no data matches the filtering query, you can also use slot `empty`, default is 'No matching data'
   */
  noMatchText?: string;
  /**
   * @description displayed text when there is no options, you can also use slot `empty`, default is 'No data'
   */
  noDataText?: string;
  /**
   * @description custom remote search method
   */
  remoteMethod?: AnyFn;
  /**
   * @description custom filter method
   */
  filterMethod?: AnyFn;
  /**
   * @description whether multiple-select is activated
   */
  multiple?: boolean;
  /**
   * @description maximum number of options user can select when `multiple` is `true`. No limit when set to 0
   *     default: 0,
   */
  multipleLimit?: number;
  /**
   * @description placeholder, default is 'Select'
   */
  placeholder?: string;
  /**
   * @description select first matching option on enter key. Use with `filterable` or `remote`
   */
  defaultFirstOption?: boolean;
  /**
   * @description when `multiple` and `filter` is true, whether to reserve current keyword after selecting an option
   *     default: true,
   */
  reserveKeyword?: boolean;
  /**
   * @description unique identity key name for value, required when value is an object
   *     default: 'value',
   */
  valueKey?: string;
  /**
   * @description whether to collapse tags to a text when multiple selecting
   */
  collapseTags?: boolean;
  /**
   * @description whether show all selected tags when mouse hover text of collapse-tags. To use this, `collapse-tags` must be true
   */
  collapseTagsTooltip?: boolean;
  /**
   * @description the max tags number to be shown. To use this, `collapse-tags` must be true
   *     default: 1,
   */
  maxCollapseTags?: number;
  /**
   * @description whether select dropdown is teleported to the body
   */
  teleported?: TooltipContentProps['teleported'];
  /**
   * @description when select dropdown is inactive and `persistent` is `false`, select dropdown will be destroyed
   *     default: true,
   */
  persistent?: boolean;
  /**
   * @description custom clear icon component
   *     default: CircleClose,
   */
  clearIcon?: typeof ElCircleCloseSvg;
  /**
   * @description whether the width of the dropdown is the same as the input
   */
  fitInputWidth?: boolean;
  /**
   * @description custom suffix icon component
   *   default: ArrowDown,
   */
  suffixIcon?: typeof ElArrowDownSvg;
  /**
   * @description tag type
   * default: 'info'
   */
  tagType?: IType;
  // tagType: { ...tagProps.type,  },
  /**
   * @description tag effect
   */
  tagEffect?: 'dark' | 'light' | 'plain';
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean;
  /**
   * @description in remote search method show suffix icon
   */
  remoteShowSuffix?: boolean;
  /**
   * @description determines whether the arrow is displayed
   */
  showArrow?: boolean;
  /**
   * @description offset of the dropdown
   */
  offset?: number;
  /**
   * @description position of dropdown
   *     default: 'bottom-start',
   */
  placement?: Placement;
  //   type: definePropType<Placement>(String),
  //   values: placements,
  // },
  /**
   * @description list of possible positions for dropdown
   */
  fallbackPlacements?: Placement[];
  //   type: definePropType<Placement[]>(Array),
  //   default: ['bottom-start', 'top-start', 'right', 'left'],
  // },
  /**
   * @description tabindex for input
   */
  tabindex?: string | number;
  /**
   * @description which element the selection dropdown appends to
   */
  appendTo?: string;
  /**
   * @description native input aria-label
   *     default: undefined,
   */
  ariaLabel?: string;
  // ...useEmptyValuesProps,
  /**
   * @description empty values supported by the component
   */
  // emptyValues: Array,
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  // valueOnClear: {
  //   type: [String, Number, Boolean, Function],
  //   default: undefined,
  //   validator: (val: any) => (isFunction(val) ? !val() : !val),
  // },

  slot?: (TdOption | TdOptionGroup)[];
  slots?: {
    tag?: ISlotItem;
    empty?: ISlotItem;
    loading?: ISlotItem;
    prefix?: ISlotItem;
    header?: ISlotItem;
    footer?: ISlotItem;
    label?: (label?: string, value?: string) => string;
  };
}

export interface SelectGroupContext extends OptionGroupProps {
  disabled?: boolean;
}

export interface SelectContext {
  props: TdSelectProps;
  states: any;
  expanded?: boolean;
  selectRef: Ref<HTMLElement | undefined>;
  optionsArray: any[];
  setSelected(): void;
  onOptionCreate(vm?: TdOption /*SelectOptionProxy*/): void;
  onOptionDestroy(
    key: string | number | boolean | object | undefined,
    vm: TdOption, // SelectOptionProxy
  ): void;
  handleOptionSelect(vm?: TdOption /*SelectOptionProxy*/): void;
}

export interface SelectOptionProxy {
  value: string | number | Record<string, string>;
  label: string | number;
  created: boolean;
  disabled: boolean;
  currentLabel: string;
  itemSelected: boolean;
  isDisabled: boolean;
  select: SelectContext;
  hoverItem: () => void;
  updateOption: (query: string) => void;
  visible: boolean;
  hover: boolean;
  selectOptionClick: () => void;
}
