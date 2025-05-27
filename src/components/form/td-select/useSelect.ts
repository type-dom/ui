import { findLastIndex, get, isEqual, debounce as lodashDebounce } from 'lodash-es';
import { ToRefs, signal, computed,watch, effect, unref, Signal } from '@type-dom/signals';
import { nextTick, onMounted, useResizeObserver } from '@type-dom/framework';
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
  AnyFn
} from '@type-dom/utils';
import { ValidateComponentsMap } from '@type-dom/svgs';

import { CHANGE_EVENT, EVENT_CODE, UPDATE_MODEL_EVENT, } from '../../../constants';
import {
  EmptyValuesContext,
  useComposition,
  useEmptyValues,
  useFocusController,
  useId,
  useLocale,
  useNamespace,
} from '../../../hooks';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { TdScrollbar } from '../../basic/td-scrollbar/td-scrollbar.class';
import { useFormItem, useFormItemInputId, useFormSize } from '../td-form';
import { TdOption } from '../td-option/td-option.class';
import { IUseFormItemInputCommonProps } from '../td-form/hooks/use-form-item';
import { OptionBasic, TdOptionProps } from '../td-option/td-option.interface';
import { SelectStates, TdSelectProps } from './td-select.interface';

export const useSelect = (props: ToRefs<TdSelectProps>, emit: AnyFn) => {
  const { t } = useLocale();
  const contentId = useId();
  const nsSelect = useNamespace('select');
  const nsInput = useNamespace('input');

  const states = { // todo  reactive({
    inputValue: signal(''),
    options: signal(new Map<string | number | boolean | object | undefined, TdOption>()),
    cachedOptions: new Map<string | number | boolean | object | undefined, TdOption>(),
    optionValues: [] as TdOptionProps[], // sorted value of options
    selected: [] as OptionBasic[],
    selectionWidth: 0,
    collapseItemWidth: 0 as number | undefined,
    selectedLabel: signal('') as Signal<string | number | boolean >,
    hoveringIndex: -1,
    previousQuery: null as string | null,
    inputHovering: signal(false),
    menuVisibleOnFocus: false,
    isBeforeHide: false,
  };

  // template refs
  const selectRef = signal<HTMLElement | undefined>(undefined);
  const selectionRef = signal<HTMLElement | undefined>(undefined);
  const tooltipRef = signal<TdTooltip | undefined>(undefined);
  const tagTooltipRef = signal<TdTooltip | undefined>(undefined);
  const inputRef = signal<HTMLInputElement | undefined>(undefined);
  const prefixRef = signal<HTMLElement | undefined>(undefined);
  const suffixRef = signal<HTMLElement | undefined>(undefined);
  const menuRef = signal<HTMLElement | undefined>(undefined);
  const tagMenuRef = signal<HTMLElement | undefined>(undefined);
  const collapseItemRef = signal<HTMLElement | undefined>(undefined);
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
      if (props.automaticDropdown?.get() && !expanded.get()) {
        expanded.set(true);
        states.menuVisibleOnFocus = true;
      }
    },
    beforeBlur(event) {
      return (
        tooltipRef?.get()?.isFocusInsideContent?.(event) ||
        tagTooltipRef?.get()?.isFocusInsideContent?.(event)
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
  const { inputId } = useFormItemInputId(props as unknown as Partial<IUseFormItemInputCommonProps>, {
    formItemContext: formItem,
  });
  const { valueOnClear, isEmptyValue } = useEmptyValues(props as unknown as EmptyValuesContext);

  const selectDisabled = computed(() => unref(props.disabled) || unref(form?.disabled));

  const hasModelValue = computed(() => {
    // console.warn('hasModelValue computed . ');
    const modelValue = unref(props.modelValue);
    return isArray(modelValue)
      ? modelValue.length > 0
      : !isEmptyValue(modelValue);
  });

  const needStatusIcon = computed(() => form?.statusIcon ?? false);

  const showClose = computed(() => {
    console.warn('showClose computed . ');
    return (
      props.clearable?.get() &&
      !selectDisabled.get() &&
      states.inputHovering.get() &&
      hasModelValue.get()
    );
  });
  const iconComponent = computed(() =>
    unref(props.remote) && unref(props.filterable) && !unref(props.remoteShowSuffix)
      ? ''
      : unref(props.suffixIcon)
  );
  const iconReverse = computed(() =>
    nsSelect.is('reverse', iconComponent.get() && expanded.get())
  );

  const validateState = computed(() => unref(formItem?.validateState) || '');
  const validateIcon = computed(
    () => ValidateComponentsMap[validateState.get() as keyof typeof ValidateComponentsMap]
  );

  const debounce = computed(() => (unref(props.remote) ? 300 : 0));

  const isRemoteSearchEmpty = computed(
    () => unref(props.remote) && !states.inputValue.get() && states.options.get().size === 0
  );

  const emptyText = computed(() => {
    if (unref(props.loading)) {
      return unref(props.loadingText) || t('el.select.loading');
    } else {
      if (
        unref(props.filterable) &&
        states.inputValue.get() &&
        states.options.get().size > 0 &&
        filteredOptionsCount.get() === 0
      ) {
        return unref(props.noMatchText) || t('el.select.noMatch');
      }
      if (states.options.get().size === 0) {
        return unref(props.noDataText) || t('el.select.noData');
      }
    }
    return undefined;
  });

  const filteredOptionsCount = computed(
    () => optionsArray.get().filter((option) => option.visible).length
  );

  const optionsArray = computed(() => {
    const list = Array.from(states.options.get().values());
    const newList: TdOption[] = [];
    states.optionValues.forEach((item) => {
      const index = list.findIndex((i) => i.props.value === item.value); // todo  .props.value === item.value edit by me
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
    // console.warn('showNewOption . optionsArray and states.inputValue is ', optionsArray,  states.inputValue);
    const hasExistingOption = optionsArray.get()?.filter((option: TdOption) => {
        // console.warn('showNewOption . option.props.created is ', option.props.created);
        return !option.props.created;
      })
      .some((option) => {
        return option.currentLabel?.get() === states.inputValue.get();
      });
    // console.warn('showNewOption . hasExistingOption is ', hasExistingOption);
    return (
      unref(props.filterable) &&
      unref(props.allowCreate) &&
      states.inputValue.get() !== '' &&
      !hasExistingOption
    );
  });

  const updateOptions = () => {
    if (unref(props.filterable) && isFunction(props.filterMethod)) return;
    if (
      unref(props.filterable) &&
      unref(props.remote) &&
      isFunction(unref(props.remoteMethod))
    )
      return;
    optionsArray.get()?.forEach((option) => {
      option.updateOption?.(states.inputValue.get());
    });
  };

  const selectSize = useFormSize();

  const collapseTagSize = computed(() =>
    ['small'].includes(selectSize.get()) ? 'small' : 'default'
  );

  const dropdownMenuVisible = computed(
    () => {
      // console.warn('dropdownMenuVisible . expanded.get() is ',
      //   expanded.get() && !isRemoteSearchEmpty.get(),
      //   ' and !isRemoteSearchEmpty.get() is ', !isRemoteSearchEmpty.get());
      return expanded.get() && !isRemoteSearchEmpty.get();
    },
    (val: boolean) => {
      // console.warn('dropdownMenuVisible , val is ', val);
      expanded.set(val);
    }
  );

  const shouldShowPlaceholder = computed(() => {
    if (unref(props.multiple) && !isUndefined(unref(props.modelValue))) {
      return (
        ensureArray(unref(props.modelValue)).length === 0 && !states.inputValue.get()
      );
    }
    const value = isArray(unref(props.modelValue))
      ? (unref(props.modelValue) as Array<any>)[0]
      : unref(props.modelValue);
    return unref(props.filterable) || isUndefined(value)
      ? !states.inputValue.get()
      : true;
  });

  const currentPlaceholder = computed(() => {
    // console.warn('currentPlaceholder . ');
    const _placeholder = unref(props.placeholder) ?? t('el.select.placeholder');
    // console.warn('_placeholder is ', _placeholder);
    const label = states.selectedLabel.get();
    // console.warn('label is ', label);
    return unref(props.multiple) || !hasModelValue.get()
      ? _placeholder
      : label;
  });

  // iOS Safari does not handle click events when a mouseenter event is registered and a DOM-change happens in a child
  // We use a Vue custom event binding to only register the event on non-iOS devices
  // ref.: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
  // Github Issue: https://github.com/vuejs/vue/issues/9859
  const mouseEnterEventName = computed(() => (isIOS ? null : 'mouseenter'));

  onMounted(() => {
    watch(
      () => unref(props.modelValue),
      (val, oldVal) => {
        // console.warn('watch props.modelValue , val is ', val, ' and oldVal is ', oldVal);
        if (unref(props.multiple)) {
          if (unref(props.filterable) && !unref(props.reserveKeyword)) {
            states.inputValue.set('');
            handleQueryChange('');
          }
        }
        setSelected();
        if (!isEqual(val, oldVal) && unref(props.validateEvent)) {
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
        // console.warn('watch expanded.get() , val is ', val);
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
      () => states.options.get().entries(),
      () => {
        // console.error('watch states.options.get().entries(), val is ', val);
        if (!isClient) return;
        // tooltipRef.value?.updatePopper?.()
        setSelected();
        if (
          unref(props.defaultFirstOption) &&
          (unref(props.filterable) || unref(props.remote)) &&
          filteredOptionsCount.get()
        ) {
          checkDefaultFirstOption();
        }
      },
      {
        flush: 'post',
      }
    );
  })

  watch(
    () => [states.hoveringIndex, optionsArray.get()],
    ([val]) => {
      // console.warn('watch [states.hoveringIndex, optionsArray.get()] , [val] is ', val);
      if (isNumber(val) && val > -1) {
        hoverOption.set(optionsArray.get()[val] || {});
      } else {
        hoverOption.set({});
      }
      optionsArray.get().forEach((option) => {
        option.hover?.set(hoverOption.get() === option);
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
    if (unref(props.filterable) && isFunction(unref(props.filterMethod))) {
      unref(props.filterMethod)?.(val);
    } else if (
      unref(props.filterable) &&
      unref(props.remote) &&
      isFunction(unref(props.remoteMethod))
    ) {
      unref(props.remoteMethod)?.(val);
    }
    if (
      unref(props.defaultFirstOption) &&
      (unref(props.filterable) || unref(props.remote)) &&
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
      .filter((n) => n.visible && !n.props.disabled && !n.states?.groupDisabled);
    const userCreatedOption = optionsInDropdown.find((n) => n.created);
    const firstOriginOption = optionsInDropdown[0];
    const valueList = optionsArray.get().map((item) => item.value);
    states.hoveringIndex = getValueIndex(
      valueList,
      userCreatedOption || firstOriginOption
    );
  };

  const setSelected = () => {
    // console.warn('setSelected . ');
    if (!unref(props.multiple)) {
      const modelValue = unref(props.modelValue);
      const value = isArray(modelValue)
        ? modelValue[0]
        : modelValue;
      const option = getOption(value);
      // console.warn('setSelected . option.currentLabel is ', option.currentLabel);
      states.selectedLabel.set(unref(option.currentLabel) ?? '');
      states.selected = [option];
      return;
    } else {
      states.selectedLabel.set('');
    }
    const result: SelectStates['selected'] = [];
    if (!isUndefined(unref(props.modelValue))) {
      ensureArray(unref(props.modelValue)).forEach((value) => {
        result.push(getOption(value!));
      });
    }
    states.selected = result;
  };

  const getOption = (value: string | number | boolean | object) => {
    // console.warn('getOption . value is ', value);
    let option: OptionBasic | undefined = undefined;
    const isObjectValue = isPlainObject(value);

    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.get()[i];
      const isEqualValue = isObjectValue
        ? get(cachedOption.value, unref(props.valueKey)!) === get(value, unref(props.valueKey)!)
        : cachedOption?.value === value;
      if (isEqualValue) {
        option = {
          value,
          currentLabel: cachedOption?.currentLabel,
          get isDisabled() {
            return cachedOption.isDisabled;
          },
        };
        break;
      }
    }
    if (option) return option;
    const label = isObjectValue ? (value as Record<string, any>).label : value ?? '';
    const newOption = {
      value,
      currentLabel: computed(() => label),
    };
    return newOption as OptionBasic;
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
    states.selectionWidth = Number.parseFloat(
      window.getComputedStyle(selectionRef.get()!).width
    )
  };

  const resetCollapseItemWidth = () => {
    states.collapseItemWidth = collapseItemRef
      ?.get()
      ?.getBoundingClientRect().width;
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

  const onInput = (event?: Event) => {
    states.inputValue.set((event?.target as any).value);
    if (unref(props.remote)) {
      debouncedOnInputChange();
    } else {
      return onInputChange();
    }
  };

  const debouncedOnInputChange = lodashDebounce(() => {
    onInputChange();
  }, debounce.get());

  const emitChange = (val: any) => {
    console.warn('emitChange . val is ', val);
    // if (!isEqual(unref(props.modelValue), val)) {
      emit(CHANGE_EVENT, val);
    // }
  };

  const getLastNotDisabledIndex = (value: any[]) =>
    findLastIndex(value, (it) => {
      const option = states.cachedOptions.get(it);
      return option && !option.props.disabled && !option.states?.groupDisabled;
    });

  const deletePrevTag = (e: KeyboardEvent) => {
    if (!unref(props.multiple)) return;
    if (e.code === EVENT_CODE.delete) return;
    if ((e.target as any)?.value.length <= 0) {
      const value = ensureArray(unref(props.modelValue)).slice();
      const lastNotDisabledIndex = getLastNotDisabledIndex(value);
      if (lastNotDisabledIndex < 0) return;
      const removeTagValue = value[lastNotDisabledIndex];
      value.splice(lastNotDisabledIndex, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit('remove-tag', removeTagValue);
    }
  };

  const deleteTag = (event?: Event, tag?: any) => {
    const index = states.selected.indexOf(tag);
    if (index > -1 && !selectDisabled.get()) {
      const value = ensureArray(unref(props.modelValue)).slice();
      value.splice(index, 1);
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      emit('remove-tag', tag.value);
    }
    event?.stopPropagation();
    focus();
  };

  const deleteSelected = (event?: Event) => {
    event?.stopPropagation();
    const value: string | any[] = unref(props.multiple) ? [] : valueOnClear.get();
    if (unref(props.multiple)) {
      for (const item of states.selected) {
        if (item.isDisabled) (value as Array<any>).push(item.value);
      }
    }
    emit(UPDATE_MODEL_EVENT, value);
    emitChange(value);
    states.hoveringIndex = -1;
    expanded.set(false);
    emit('clear');
    focus();
  };

  const handleOptionSelect = (option: TdOption) => {
    console.warn('handleOptionSelect . option is ', option);
    if (unref(props.multiple)) {
      const value = ensureArray(unref(props.modelValue) ?? []).slice();
      const optionIndex = getValueIndex(value, option);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (
        unref(props.multipleLimit)! <= 0 ||
        unref(value.length) < unref(props.multipleLimit)!
      ) {
        value.push(unref(option.props.value!));
      }
      emit(UPDATE_MODEL_EVENT, value);
      emitChange(value);
      if (option.created) {
        handleQueryChange('');
      }
      if (unref(props.filterable) && !unref(props.reserveKeyword)) {
        states.inputValue.set('');
      }
    } else {
      // states.selectedLabel?.set(option.props.label ?? ''); // add by me todo
      // option.currentLabel?.set(option.props.label);
      emit(UPDATE_MODEL_EVENT, option.props.value);
      emitChange(option.props.value);
      expanded.set(false);
    }
    focus();
    if (expanded.get()) return;
    nextTick(() => {
      scrollToOption(option);
    });
  };

  const getValueIndex = (arr: any[] = [], option?: any) => {
    if (isUndefined(option)) return -1;
    if (!isObject(option.value)) return arr.indexOf(option.value);

    return arr.findIndex((item) => {
      return isEqual(get(item, unref(props.valueKey)!), getValueKey(option));
    });
  };

  const scrollToOption = (option: any) => {
    const targetOption = isArray(option) ? option[0] : option;
    let target = null;

    if (targetOption?.value) {
      const options = optionsArray
        .get()
        .filter((item) => item.value === targetOption.value);
      if (options.length > 0) {
        target = options[0].dom;
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
    scrollbarRef?.get()?.handleScroll?.();
  };

  const onOptionCreate = (vm: TdOption) => {
    // console.warn('onOptionCreate . ');
    states.options.get().set(unref(vm.props.value), vm);
    states.options.set(states.options.get()); // 触发监听
    states.cachedOptions.set(unref(vm.props.value), vm);
  };

  const onOptionDestroy = (key: any, vm: TdOption) => {
    if (states.options.get().get(key) === vm) {
      states.options.get().delete(key);
      // console.warn('onOptionDestroy . then states.options.set')
      states.options.set(states.options.get()); // 触发监听
    }
  };

  const popperRef = computed(() => {
    return tooltipRef.get()?.popperRef?.get()?.contentRef?.get();
  });

  const handleMenuEnter = () => {
    states.isBeforeHide = false;
    nextTick(() => {
      scrollbarRef.get()?.updateDom?.();
      scrollToOption(states.selected);
    });
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

  const handleClearClick = (event?: Event) => {
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
    if (isIOS) states.inputHovering.set(true);

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

  const getValueKey = (item: any) => {
    return isObject(item.value) ? get(item.value, unref(props.valueKey)!) : item.value;
  };

  const optionsAllDisabled = computed(() =>
    optionsArray
      .get()
      .filter((option) => option.visible)
      .every((option) => option.isDisabled)
  );

  const showTagList = computed(() => {
    console.warn('showTagList . ');
    if (!unref(props.multiple)) {
      return [];
    }
    return unref(props.collapseTags)
      ? states.selected.slice(0, unref(props.maxCollapseTags))
      : states.selected;
  });

  const collapseTagList = computed(() => {
    if (!unref(props.multiple)) {
      return [];
    }
    return unref(props.collapseTags)
      ? states.selected.slice(unref(props.maxCollapseTags))
      : [];
  });

  const navigateOptions = (direction: string) => {
    if (!expanded.get()) {
      expanded.set(true);
      return;
    }
    if (
      states.options.get().size === 0 ||
      filteredOptionsCount.get() === 0 ||
      isComposing.get()
    )
      return;

    if (!optionsAllDisabled.get()) {
      if (direction === 'next') {
        states.hoveringIndex++;
        if (states.hoveringIndex === states.options.get().size) {
          states.hoveringIndex = 0;
        }
      } else if (direction === 'prev') {
        states.hoveringIndex--;
        if (states.hoveringIndex < 0) {
          states.hoveringIndex = states.options.get().size - 1;
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
    const style = window.getComputedStyle(selectionRef!.get()!);
    return Number.parseFloat(style.gap || '6px');
  };

  // computed style
  const tagStyle = computed(() => {
    const gapWidth = getGapWidth();
    const maxWidth =
      collapseItemRef.get() && unref(props.maxCollapseTags) === 1
        ? states.selectionWidth - states.collapseItemWidth! - gapWidth
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
