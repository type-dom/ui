// @ts-nocheck
// import {
//   computed,
//   nextTick,
//   onMounted,
//   reactive,
//   ref,
//   watch,
//   watchEffect,
// } from 'vue'

import {
  Ref,
  Computed,
  signal,
  computed,
  watch,
  effect,
} from '@type-dom/signals';
import { nextTick, onMounted, useResizeObserver } from '@type-dom/framework';
import {
  findLastIndex,
  get,
  isEqual,
  debounce as lodashDebounce,
} from 'lodash';
import {
  isClient,
  isIOS,
  debugWarn,
  ensureArray,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  scrollIntoView,
} from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { TdScrollbar } from '@type-dom/ui';
import { ValidateComponentsMap } from '@type-dom/svgs';
import {
  CHANGE_EVENT,
  EVENT_CODE,
  UPDATE_MODEL_EVENT,
} from '../../../constants';
import {
  useComposition,
  useEmptyValues,
  useFocusController,
  useId,
  useLocale,
  useNamespace,
  UseNamespaceReturn,
} from '../../../hooks';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { useFormItem, useFormItemInputId, useFormSize } from '../td-form';
import type { ISelectProps, SelectOptionProxy } from './token';

type useSelectType = (
  props: ISelectProps,
  emit: any
) => {
  inputId: Ref<string | undefined>;
  contentId: Ref<string | undefined>;
  nsSelect: UseNamespaceReturn;
  nsInput: UseNamespaceReturn;
  states: Record<string, any>;
  isFocused: Ref<boolean>;
  expanded: Ref<boolean>;
  optionsArray: Computed<any[]>;
  hoverOption: Ref<unknown>;
  selectSize: Computed<'' | 'default' | 'small' | 'large'>;
  filteredOptionsCount: Computed<number>;
  resetCalculatorWidth: () => void;
  updateTooltip: () => void;
  updateTagTooltip: () => void;
  debouncedOnInputChange: DebouncedFunc<() => void>;
  onInput: (event?: Event) => void;
  deletePrevTag: (event?: Event) => void;
  deleteTag: (event?: Event, tag: any) => void;
  deleteSelected: (event?: Event) => void;
  handleOptionSelect: (option: any) => void;
  scrollToOption: (option: any) => void;
  hasModelValue: Computed<boolean>;
  shouldShowPlaceholder: Computed<boolean>;
  currentPlaceholder: Computed<string>;
  mouseEnterEventName: Ref<string | null>;
  needStatusIcon: Computed<boolean>;
  showClose: Computed<boolean>;
  iconComponent: Computed<string>;
  iconReverse: Computed<boolean>;
  validateState: Computed<string>;
  popupScroll: (data: { scrollTop: number; scrollLeft: number }) => void;

  validateIcon: Computed<unknown>;
  showNewOption: Computed<boolean>;
  updateOptions: () => void;
  collapseTagSize: Computed<'default' | 'small'>;
  setSelected: () => void;
  selectDisabled: Computed<boolean>;
  emptyText: Computed<string | null>;
  handleCompositionStart: (e?: Event) => void;
  handleCompositionUpdate: (e?: Event) => void;
  handleCompositionEnd: (e?: Event) => void;
  onOptionCreate: (vm: SelectOptionProxy) => void;
  onOptionDestroy: (key: any, vm: SelectOptionProxy) => void;
  handleMenuEnter: () => void;
  focus: () => void;
  blur: () => void;
  handleClearClick: (event?: Event) => void;
  handleClickOutside: (event?: Event) => void;
  handleEsc: () => void;
  toggleMenu: () => void;
  selectOption: () => void;
  getValueKey: (item: any) => any;
  navigateOptions: (direction: string) => void;
  dropdownMenuVisible: Computed<boolean>;
  showTagList: Computed<unknown[]>;
  collapseTagList: Computed<unknown[]>;
  tagStyle: Computed<unknown>;
  collapseTagStyle: Computed<IStyle>;
  inputStyle: Computed<unknown>;
  popperRef: Computed<unknown>;
  inputRef: Ref<HTMLInputElement | undefined>;
  tooltipRef: Ref<TdTooltip | undefined>;
  tagTooltipRef: Ref<TdTooltip | undefined>;
  calculatorRef: Ref<HTMLElement>;
  prefixRef: Ref<HTMLElement>;
  suffixRef: Ref<HTMLElement>;
  selectRef: Ref<HTMLElement>;
  wrapperRef: Ref<HTMLElement>;
  selectionRef: Ref<HTMLElement>;
  scrollbarRef: Ref<
    | {
        handleScroll: () => void;
      }
    | undefined
  >;
  menuRef: Ref<HTMLElement>;
  tagMenuRef: Ref<HTMLElement>;
  collapseItemRef: Ref<HTMLElement>;
};

export const useSelect: useSelectType = (props: ISelectProps, emit) => {
  const { t } = useLocale();
  const contentId = useId();
  const nsSelect = useNamespace('select');
  const nsInput = useNamespace('input');

  const states = {
    inputValue: signal(''),
    options: new Map(),
    cachedOptions: new Map(),
    optionValues: [] as any[], // sorted value of options
    selected: [] as any[],
    selectionWidth: 0,
    collapseItemWidth: 0,
    selectedLabel: '',
    hoveringIndex: -1,
    previousQuery: null,
    inputHovering: false,
    menuVisibleOnFocus: false,
    isBeforeHide: false,
  };

  // template refs
  const selectRef = signal<HTMLElement>(undefined);
  const selectionRef = signal<HTMLElement>(undefined);
  const tooltipRef = signal<InstanceType<typeof ElTooltip> | undefined>(
    undefined
  );
  const tagTooltipRef = signal<InstanceType<typeof ElTooltip> | undefined>(
    undefined
  );
  const inputRef = signal<HTMLInputElement | undefined>(undefined);
  const prefixRef = signal<HTMLElement>(undefined);
  const suffixRef = signal<HTMLElement>(undefined);
  const menuRef = signal<HTMLElement>(undefined);
  const tagMenuRef = signal<HTMLElement>(undefined);
  const collapseItemRef = signal<HTMLElement>(undefined);
  const scrollbarRef = signal<TdScrollbar | undefined>(undefined);

  const {
    isComposing,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
  } = useComposition({
    afterComposition: (e) => onInput(e),
  });

  const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
    beforeFocus() {
      return selectDisabled.get();
    },
    afterFocus() {
      if (props.automaticDropdown && !expanded.get()) {
        expanded.set(true);
        states.menuVisibleOnFocus = true;
      }
    },
    beforeBlur(event) {
      return (
        tooltipRef.get()?.isFocusInsideContent(event) ||
        tagTooltipRef.get()?.isFocusInsideContent(event)
      );
    },
    afterBlur() {
      expanded.set(false);
      states.menuVisibleOnFocus = false;
    },
  });

  // the controller of the expanded popup
  const expanded = signal(false);
  const hoverOption = signal();

  const { form, formItem } = useFormItem();
  const { inputId } = useFormItemInputId(props, {
    formItemContext: formItem,
  });
  const { valueOnClear, isEmptyValue } = useEmptyValues(props);

  const selectDisabled = computed(() => props.disabled || form?.disabled);

  const hasModelValue = computed(() => {
    return isArray(props.modelValue)
      ? props.modelValue.length > 0
      : !isEmptyValue(props.modelValue);
  });

  const needStatusIcon = computed(() => form?.statusIcon ?? false);

  const showClose = computed(() => {
    return (
      props.clearable &&
      !selectDisabled.get() &&
      states.inputHovering &&
      hasModelValue.get()
    );
  });
  const iconComponent = computed(() =>
    props.remote && props.filterable && !props.remoteShowSuffix
      ? ''
      : props.suffixIcon
  );
  const iconReverse = computed(() =>
    nsSelect.is('reverse', iconComponent.get() && expanded.get())
  );

  const validateState = computed(() => formItem?.validateState || '');
  const validateIcon = computed(
    () => ValidateComponentsMap[validateState.get()]
  );

  const debounce = computed(() => (props.remote ? 300 : 0));

  const isRemoteSearchEmpty = computed(
    () => props.remote && !states.inputValue.get() && states.options.size === 0
  );

  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || t('el.select.loading');
    } else {
      if (
        props.filterable &&
        states.inputValue.get() &&
        states.options.size > 0 &&
        filteredOptionsCount.get() === 0
      ) {
        return props.noMatchText || t('el.select.noMatch');
      }
      if (states.options.size === 0) {
        return props.noDataText || t('el.select.noData');
      }
    }
    return null;
  });

  const filteredOptionsCount = computed(
    () => optionsArray.get().filter((option) => option.visible).length
  );

  const optionsArray = computed(() => {
    const list = Array.from(states.options.values());
    const newList = [];
    states.optionValues.forEach((item) => {
      const index = list.findIndex((i) => i.value === item);
      if (index > -1) {
        newList.push(list[index]);
      }
    });
    return newList.length >= list.length ? newList : list;
  });

  const cachedOptionsArray = computed(() =>
    Array.from(states.cachedOptions.values())
  );

  const showNewOption = computed(() => {
    const hasExistingOption = optionsArray
      .get()
      .filter((option) => {
        return !option.created;
      })
      .some((option) => {
        return option.currentLabel === states.inputValue.get();
      });
    return (
      props.filterable &&
      props.allowCreate &&
      states.inputValue.get() !== '' &&
      !hasExistingOption
    );
  });

  const updateOptions = () => {
    if (props.filterable && isFunction(props.filterMethod)) return;
    if (props.filterable && props.remote && isFunction(props.remoteMethod))
      return;
    optionsArray.get().forEach((option) => {
      option.updateOption?.(states.inputValue.get());
    });
  };

  const selectSize = useFormSize();

  const collapseTagSize = computed(() =>
    ['small'].includes(selectSize.get()) ? 'small' : 'default'
  );

  const dropdownMenuVisible = computed({
    get() {
      return expanded.get() && !isRemoteSearchEmpty.get();
    },
    set(val: boolean) {
      expanded.set(val);
    },
  });

  const shouldShowPlaceholder = computed(() => {
    if (props.multiple && !isUndefined(props.modelValue)) {
      return (
        ensureArray(props.modelValue).length === 0 && !states.inputValue.get()
      );
    }
    const value = isArray(props.modelValue)
      ? props.modelValue[0]
      : props.modelValue;
    return props.filterable || isUndefined(value)
      ? !states.inputValue.get()
      : true;
  });

  const currentPlaceholder = computed(() => {
    const _placeholder = props.placeholder ?? t('el.select.placeholder');
    return props.multiple || !hasModelValue.get()
      ? _placeholder
      : states.selectedLabel;
  });

  // iOS Safari does not handle click events when a mouseenter event is registered and a DOM-change happens in a child
  // We use a Vue custom event binding to only register the event on non-iOS devices
  // ref.: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
  // Github Issue: https://github.com/vuejs/vue/issues/9859
  const mouseEnterEventName = computed(() => (isIOS ? null : 'mouseenter'));

  const setSelected = () => {
    if (!props.multiple) {
      const value = isArray(props.modelValue)
        ? props.modelValue[0]
        : props.modelValue;
      const option = getOption(value);
      states.selectedLabel = option.currentLabel;
      states.selected = [option];
      return;
    } else {
      states.selectedLabel = '';
    }
    const result: any[] = [];
    if (!isUndefined(props.modelValue)) {
      ensureArray(props.modelValue).forEach((value) => {
        result.push(getOption(value));
      });
    }
    states.selected = result;
  };

  const getOption = (value) => {
    let option;
    const isObjectValue = isPlainObject(value);

    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.get()[i];
      const isEqualValue = isObjectValue
        ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey)
        : cachedOption.value === value;
      if (isEqualValue) {
        option = {
          value,
          currentLabel: cachedOption.currentLabel,
          get isDisabled() {
            return cachedOption.isDisabled;
          },
        };
        break;
      }
    }
    if (option) return option;
    const label = isObjectValue ? value.label : value ?? '';
    const newOption = {
      value,
      currentLabel: label,
    };
    return newOption;
  };

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        if (props.filterable && !props.reserveKeyword) {
          states.inputValue.set('');
          handleQueryChange('');
        }
      }
      setSelected();
      if (!isEqual(val, oldVal) && props.validateEvent) {
        formItem?.validate('change').catch((err) => debugWarn(err));
      }
    },
    {
      flush: 'post',
      deep: true,
    }
  );

  watch(
    () => expanded.get(),
    (val) => {
      if (val) {
        handleQueryChange(states.inputValue.get());
      } else {
        states.inputValue.set('');
        states.previousQuery = null;
        states.isBeforeHide = true;
      }
      emit('visible-change', val);
    }
  );

  watch(
    // fix `Array.prototype.push/splice/..` cannot trigger non-deep watcher
    // https://github.com/vuejs/vue-next/issues/2116
    () => states.options.entries(),
    () => {
      if (!isClient) return;
      // tooltipRef.value?.updatePopper?.()
      setSelected();
      if (
        props.defaultFirstOption &&
        (props.filterable || props.remote) &&
        filteredOptionsCount.get()
      ) {
        checkDefaultFirstOption();
      }
    },
    {
      flush: 'post',
    }
  );

  watch(
    () => states.hoveringIndex,
    (val) => {
      if (isNumber(val) && val > -1) {
        hoverOption.set(optionsArray.get()[val] || {});
      } else {
        hoverOption.set({});
      }
      optionsArray.get().forEach((option) => {
        option.hover = hoverOption.get() === option;
      });
    }
  );

  effect(() => {
    // Anything could cause options changed, then update options
    // If you want to control it by condition, write here
    if (states.isBeforeHide) return;
    updateOptions();
  });

  const handleQueryChange = (val: string) => {
    if (states.previousQuery === val || isComposing.get()) {
      return;
    }
    states.previousQuery = val;
    if (props.filterable && isFunction(props.filterMethod)) {
      props.filterMethod(val);
    } else if (
      props.filterable &&
      props.remote &&
      isFunction(props.remoteMethod)
    ) {
      props.remoteMethod(val);
    }
    if (
      props.defaultFirstOption &&
      (props.filterable || props.remote) &&
      filteredOptionsCount.get()
    ) {
      nextTick(checkDefaultFirstOption);
    } else {
      nextTick(updateHoveringIndex);
    }
  };

  /**
   * find and highlight first option as default selected
   * @remark
   * - if the first option in dropdown list is user-created,
   *   it would be at the end of the optionsArray
   *   so find it and set hover.
   *   (NOTE: there must be only one user-created option in dropdown list with query)
   * - if there's no user-created option in list, just find the first one as usual
   *   (NOTE: exclude options that are disabled or in disabled-group)
   */
  const checkDefaultFirstOption = () => {
    const optionsInDropdown = optionsArray
      .get()
      .filter((n) => n.visible && !n.disabled && !n.states.groupDisabled);
    const userCreatedOption = optionsInDropdown.find((n) => n.created);
    const firstOriginOption = optionsInDropdown[0];
    const valueList = optionsArray.get().map((item) => item.value);
    states.hoveringIndex = getValueIndex(
      valueList,
      userCreatedOption || firstOriginOption
    );
  };

  const updateHoveringIndex = () => {
    states.hoveringIndex = optionsArray
      .get()
      .findIndex((item) =>
        states.selected.some(
          (selected) => getValueKey(selected) === getValueKey(item)
        )
      );
  };

  const resetSelectionWidth = () => {
    states.selectionWidth = selectionRef.get().getBoundingClientRect().width;
  };

  const resetCollapseItemWidth = () => {
    states.collapseItemWidth = collapseItemRef
      .get()
      .getBoundingClientRect().width;
  };

  const updateTooltip = () => {
    tooltipRef.get()?.updatePopper?.();
  };

  const updateTagTooltip = () => {
    tagTooltipRef.get()?.updatePopper?.();
  };

  const onInputChange = () => {
    if (states.inputValue.get().length > 0 && !expanded.get()) {
      expanded.set(true);
    }
    handleQueryChange(states.inputValue.get());
  };

  const onInput = (event) => {
    states.inputValue.set(event.target.value);
    if (props.remote) {
      debouncedOnInputChange();
    } else {
      return onInputChange();
    }
  };

  const debouncedOnInputChange = lodashDebounce(() => {
    onInputChange();
  }, debounce.get());

  const emitChange = (val) => {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val);
    }
  };

  const getLastNotDisabledIndex = (value) =>
    findLastIndex(value, (it) => {
      const option = states.cachedOptions.get(it);
      return option && !option.disabled && !option.states.groupDisabled;
    });

  const deletePrevTag = (e) => {
    if (!props.multiple) return;
    if (e.code === EVENT_CODE.delete) return;
    if (e.target.value.length <= 0) {
      const value = ensureArray(props.modelValue).slice();
      const lastNotDisabledIndex = getLastNotDisabledIndex(value);
      if (lastNotDisabledIndex < 0) return;
      const removeTagValue = value[lastNotDisabledIndex];
      value.splice(lastNotDisabledIndex, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit('remove-tag', removeTagValue);
    }
  };

  const deleteTag = (event, tag) => {
    const index = states.selected.indexOf(tag);
    if (index > -1 && !selectDisabled.get()) {
      const value = ensureArray(props.modelValue).slice();
      value.splice(index, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit('remove-tag', tag.value);
    }
    event.stopPropagation();
    focus();
  };

  const deleteSelected = (event) => {
    event.stopPropagation();
    const value: string | any[] = props.multiple ? [] : valueOnClear.get();
    if (props.multiple) {
      for (const item of states.selected) {
        if (item.isDisabled) value.push(item.value);
      }
    }
    emit(UPDATE_MODEL_EVENT, value);
    emitChange(value);
    states.hoveringIndex = -1;
    expanded.set(false);
    emit('clear');
    focus();
  };

  const handleOptionSelect = (option) => {
    if (props.multiple) {
      const value = ensureArray(props.modelValue ?? []).slice();
      const optionIndex = getValueIndex(value, option);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (
        props.multipleLimit <= 0 ||
        value.length < props.multipleLimit
      ) {
        value.push(option.value);
      }
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      if (option.created) {
        handleQueryChange('');
      }
      if (props.filterable && !props.reserveKeyword) {
        states.inputValue.set('');
      }
    } else {
      emit(UPDATE_MODEL_EVENT, option.value);
      emitChange(option.value);
      expanded.set(false);
    }
    focus();
    if (expanded.get()) return;
    nextTick(() => {
      scrollToOption(option);
    });
  };

  const getValueIndex = (arr: any[] = [], option) => {
    if (isUndefined(option)) return -1;
    if (!isObject(option.value)) return arr.indexOf(option.value);

    return arr.findIndex((item) => {
      return isEqual(get(item, props.valueKey), getValueKey(option));
    });
  };

  const scrollToOption = (option) => {
    const targetOption = isArray(option) ? option[0] : option;
    let target = null;

    if (targetOption?.value) {
      const options = optionsArray
        .get()
        .filter((item) => item.value === targetOption.value);
      if (options.length > 0) {
        target = options[0].$el;
      }
    }

    if (tooltipRef.get() && target) {
      const menu = tooltipRef
        .get()
        ?.popperRef?.get()
        ?.contentRef?.get()
        ?.querySelector?.(`.${nsSelect.be('dropdown', 'wrap')}`);
      if (menu) {
        scrollIntoView(menu as HTMLElement, target);
      }
    }
    scrollbarRef.get()?.handleScroll();
  };

  const onOptionCreate = (vm: SelectOptionProxy) => {
    states.options.set(vm.value, vm);
    states.cachedOptions.set(vm.value, vm);
  };

  const onOptionDestroy = (key, vm: SelectOptionProxy) => {
    if (states.options.get(key) === vm) {
      states.options.delete(key);
    }
  };

  const popperRef = computed(() => {
    return tooltipRef.get()?.popperRef?.get()?.contentRef?.get();
  });

  const handleMenuEnter = () => {
    states.isBeforeHide = false;
    nextTick(() => scrollToOption(states.selected));
  };

  const focus = () => {
    inputRef.get()?.focus();
  };

  const blur = () => {
    if (expanded.get()) {
      expanded.set(false);
      nextTick(() => inputRef.get()?.blur());
      return;
    }
    inputRef.get()?.blur();
  };

  const handleClearClick = (event: Event) => {
    deleteSelected(event);
  };

  const handleClickOutside = (event: Event) => {
    expanded.set(false);

    if (isFocused.get()) {
      const _event = new FocusEvent('focus', event);
      nextTick(() => handleBlur(_event));
    }
  };

  const handleEsc = () => {
    if (states.inputValue.get().length > 0) {
      states.inputValue.set('');
    } else {
      expanded.set(false);
    }
  };

  const toggleMenu = () => {
    if (selectDisabled.get()) return;

    // We only set the inputHovering state to true on mouseenter event on iOS devices
    // To keep the state updated we set it here to true
    if (isIOS) states.inputHovering = true;

    if (states.menuVisibleOnFocus) {
      // controlled by automaticDropdown
      states.menuVisibleOnFocus = false;
    } else {
      expanded.set(!expanded.get());
    }
  };

  const selectOption = () => {
    if (!expanded.get()) {
      toggleMenu();
    } else {
      const option = optionsArray.get()[states.hoveringIndex];
      if (option && !option.isDisabled) {
        handleOptionSelect(option);
      }
    }
  };

  const getValueKey = (item) => {
    return isObject(item.value) ? get(item.value, props.valueKey) : item.value;
  };

  const optionsAllDisabled = computed(() =>
    optionsArray
      .get()
      .filter((option) => option.visible)
      .every((option) => option.isDisabled)
  );

  const showTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags
      ? states.selected.slice(0, props.maxCollapseTags)
      : states.selected;
  });

  const collapseTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return props.collapseTags
      ? states.selected.slice(props.maxCollapseTags)
      : [];
  });

  const navigateOptions = (direction) => {
    if (!expanded.get()) {
      expanded.set(true);
      return;
    }
    if (
      states.options.size === 0 ||
      filteredOptionsCount.get() === 0 ||
      isComposing.get()
    )
      return;

    if (!optionsAllDisabled.get()) {
      if (direction === 'next') {
        states.hoveringIndex++;
        if (states.hoveringIndex === states.options.size) {
          states.hoveringIndex = 0;
        }
      } else if (direction === 'prev') {
        states.hoveringIndex--;
        if (states.hoveringIndex < 0) {
          states.hoveringIndex = states.options.size - 1;
        }
      }
      const option = optionsArray.get()[states.hoveringIndex];
      if (option.isDisabled || !option.visible) {
        navigateOptions(direction);
      }
      nextTick(() => scrollToOption(hoverOption.get()));
    }
  };

  const getGapWidth = () => {
    if (!selectionRef.get()) return 0;
    const style = window.getComputedStyle(selectionRef.get());
    return Number.parseFloat(style.gap || '6px');
  };

  // computed style
  const tagStyle = computed(() => {
    const gapWidth = getGapWidth();
    const maxWidth =
      collapseItemRef.get() && props.maxCollapseTags === 1
        ? states.selectionWidth - states.collapseItemWidth - gapWidth
        : states.selectionWidth;
    return { maxWidth: `${maxWidth}px` };
  });

  const collapseTagStyle = computed(() => {
    return { maxWidth: `${states.selectionWidth}px` };
  });

  const popupScroll = (data: { scrollTop: number; scrollLeft: number }) => {
    emit('popup-scroll', data);
  };

  useResizeObserver(selectionRef, resetSelectionWidth);
  useResizeObserver(menuRef, updateTooltip);
  useResizeObserver(wrapperRef, updateTooltip);
  useResizeObserver(tagMenuRef, updateTagTooltip);
  useResizeObserver(collapseItemRef, resetCollapseItemWidth);

  onMounted(() => {
    setSelected();
  });

  return {
    inputId,
    contentId,
    nsSelect,
    nsInput,
    states,
    isFocused,
    expanded,
    optionsArray,
    hoverOption,
    selectSize,
    filteredOptionsCount,
    updateTooltip,
    updateTagTooltip,
    debouncedOnInputChange,
    onInput,
    deletePrevTag,
    deleteTag,
    deleteSelected,
    handleOptionSelect,
    scrollToOption,
    hasModelValue,
    shouldShowPlaceholder,
    currentPlaceholder,
    mouseEnterEventName,
    needStatusIcon,
    showClose,
    iconComponent,
    iconReverse,
    validateState,
    validateIcon,
    showNewOption,
    updateOptions,
    collapseTagSize,
    setSelected,
    selectDisabled,
    emptyText,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
    onOptionCreate,
    onOptionDestroy,
    handleMenuEnter,
    focus,
    blur,
    handleClearClick,
    handleClickOutside,
    handleEsc,
    toggleMenu,
    selectOption,
    getValueKey,
    navigateOptions,
    dropdownMenuVisible,
    showTagList,
    collapseTagList,
    popupScroll,

    // computed style
    tagStyle,
    collapseTagStyle,

    // DOM ref
    popperRef,
    inputRef,
    tooltipRef,
    tagTooltipRef,
    prefixRef,
    suffixRef,
    selectRef,
    wrapperRef,
    selectionRef,
    scrollbarRef,
    menuRef,
    tagMenuRef,
    collapseItemRef,
  };
};
