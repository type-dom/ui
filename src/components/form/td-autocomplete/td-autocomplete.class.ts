import {
  defineExpose,
  Div,
  LI,
  onBeforeUnmount,
  onClickOutside,
  onMounted,
  TypeFragment,
  useAttrs as useRawAttrs,
  StyleValue,
} from '@type-dom/framework';
import { AnyFn, debounce, isArray, throwError } from '@type-dom/utils';
import { computed, signal, unref, Signal } from '@type-dom/signals';
import { ElLoadingSvg } from '@type-dom/svgs';
// import { IStyle } from '@type-dom/css-type';
import { useAttrs } from '../../../hooks/use-attrs';
import { useId } from '../../../hooks/use-id';
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT, } from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { TdScrollbar } from '../../basic/td-scrollbar/td-scrollbar.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdInput } from '../td-input/td-input.class';
import { useFormDisabled } from '../td-form/hooks/use-form-common-props';
import { AutocompleteData, AutocompleteProps, ITdAutoComplete, } from './td-autocomplete.interface';
import { autocompleteEmits, autocompleteProps, } from './td-autocomplete.const';
import './style/index';

export class TdAutocomplete extends TypeFragment implements ITdAutoComplete {
  className: 'TdAutoComplete';
  override props: AutocompleteProps;
  highlightedIndex?: Signal<number>;
  activated?: Signal<boolean>;
  loading?: Signal<boolean>;
  inputRef?: Signal<TdInput>;
  popperRef?: Signal<TdTooltip>;
  suggestions?: Signal<AutocompleteData>;
  handleSelect?: AnyFn;
  handleKeyEnter?: AnyFn;
  focus?: AnyFn;
  blur?: AnyFn;
  close?: AnyFn;
  highlight?: AnyFn;
  getData?: AnyFn;

  constructor(params: AutocompleteProps = {}) {
    super();
    this.className = 'TdAutoComplete';
    this.addEmits(autocompleteEmits);
    this.assignProps(autocompleteProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'TdAutocomplete';
    const props = this.props;
    const emit = this.emit;

    const attrs = useAttrs();
    console.warn('autocomplete attrs is ', attrs.get());

    const rawAttrs = useRawAttrs();
    console.warn('rawAttrs is ', rawAttrs);
    const disabled = useFormDisabled();
    const ns = useNamespace('autocomplete');

    const inputRef = signal<TdInput>();
    const regionRef = signal<HTMLElement>();
    const popperRef = signal<TdTooltip>();
    const listboxRef = signal<HTMLElement>();

    let readonly = false;
    let ignoreFocusEvent = false;
    const suggestions = signal<AutocompleteData>([]);
    const highlightedIndex = signal(-1);
    const dropdownWidth = signal('');
    const activated = signal(false);
    const suggestionDisabled = signal(false);
    const loading = signal(false);

    const listboxId = useId();
    const styles = computed(() => rawAttrs?.style as StyleValue);

    const suggestionVisible = computed(() => {
      console.warn('suggestionVisible. suggestions.get()', suggestions.get());
      const isValidData = suggestions.get().length > 0;
      return (isValidData || loading.get()) && activated.get();
    });

    const suggestionLoading = computed(
      () => !props.hideLoading && loading.get()
    );

    const refInput = computed<HTMLInputElement[]>(() => {
      if (inputRef.get()) {
        return Array.from<HTMLInputElement>(
          inputRef.get()!.dom!.querySelectorAll('input')!
        );
      }
      return [];
    });

    const onSuggestionShow = () => {
      if (suggestionVisible.get()) {
        dropdownWidth.set(`${inputRef.get()!.dom!.offsetWidth}px`);
      }
    };

    const onHide = () => {
      highlightedIndex.set(-1);
    };

    const getData = async (queryString: string) => {
      if (suggestionDisabled.get()) return;

      const cb = (suggestionList: AutocompleteData) => {
        loading.set(false);
        if (suggestionDisabled.get()) return;

        if (isArray(suggestionList)) {
          suggestions.set(suggestionList);
          highlightedIndex.set(props.highlightFirstItem ? 0 : -1);
        } else {
          throwError(
            COMPONENT_NAME,
            'autocomplete suggestions must be an array'
          );
        }
      };

      loading.set(true);
      if (isArray(props.fetchSuggestions)) {
        cb(props.fetchSuggestions);
      } else {
        const result = await props.fetchSuggestions?.(queryString, cb);
        // console.warn('result is ', result);
        if (isArray(result)) cb(result);
      }
    };
    const debouncedGetData = debounce(getData, props.debounce!);

    const handleInput = (value?: string) => {
      console.warn('handleInput . ');
      const valuePresented = !!value;

      emit(INPUT_EVENT, value);
      emit(UPDATE_MODEL_EVENT, value);

      suggestionDisabled.set(false)
      // activated.value ||= valuePresented
      if (!activated.get()) {
        activated.set(valuePresented);
      }

      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.set(true);
        suggestions.set([]);
        return;
      }

      debouncedGetData(value!);
    };

    const handleMouseDown = (event?: MouseEvent) => {
      console.warn('handleMouseDown . ');
      if (disabled.get()) return;
      if (
        (event?.target as HTMLElement)?.tagName !== 'INPUT' ||
        refInput.get().includes(document.activeElement as HTMLInputElement)
      ) {
        activated.set(true);
      }
    };

    const handleChange = (value?: string) => {
      console.warn('handleChange . ');
      emit(CHANGE_EVENT, value);
    };

    const handleFocus = (evt?: FocusEvent) => {
      console.warn('handleFocus . ');
      if (!ignoreFocusEvent) {
        activated.set(true);
        emit('focus', evt);
        console.warn('props.vModel.get() is ', props.vModel?.get());
        console.warn('props.modelValue is ', props.modelValue);
        const queryString = props.modelValue ?? ''
        if (props.triggerOnFocus && !readonly) {
          debouncedGetData(String(queryString));
        }
      } else {
        ignoreFocusEvent = false;
      }
    };

    const handleBlur = (evt?: FocusEvent) => {
      setTimeout(() => {
        // validate current focus event is inside el-tooltip-content
        // if so, ignore the blur event and the preview focus event
        if (popperRef.get()?.isFocusInsideContent?.()) {
          ignoreFocusEvent = true;
          return;
        }
        if (activated.get()) close();
        emit('blur', evt);
      });
    };

    const handleClear = () => {
      activated.set(false);
      emit(UPDATE_MODEL_EVENT, '');
      emit('clear');
    };

    const handleKeyEnter = async () => {
      if (
        suggestionVisible.get() &&
        highlightedIndex.get() >= 0 &&
        highlightedIndex.get() < suggestions.get().length
      ) {
        handleSelect(suggestions.get()[highlightedIndex.get()]);
      } else if (props.selectWhenUnmatched) {
        emit('select', { value: props.vModel?.get() });
        suggestions.set([]);
        highlightedIndex.set(-1);
      }
    };

    const handleKeyEscape = (evt?: Event) => {
      if (suggestionVisible.get()) {
        evt?.preventDefault();
        evt?.stopPropagation();
        close();
      }
    };

    const close = () => {
      activated.set(false);
    };

    const focus = () => {
      inputRef.get()?.focus?.();
    };

    const blur = () => {
      inputRef.get()?.blur?.();
    };

    const handleSelect = async (item: any) => {
      emit(INPUT_EVENT, item[props.valueKey!]);
      emit(UPDATE_MODEL_EVENT, item[props.valueKey!]);
      emit('select', item);
      suggestions.set([]);
      highlightedIndex.set(-1);
    };

    const highlight = (index: number) => {
      if (!suggestionVisible.get() || loading.get()) return;

      if (index < 0) {
        highlightedIndex.set(-1);
        return;
      }

      if (index >= suggestions.get().length) {
        index = suggestions.get().length - 1;
      }
      const suggestion = regionRef.get()!
        .querySelector(`.${ns.be('suggestion', 'wrap')}`)!;
      const suggestionList = suggestion.querySelectorAll<HTMLElement>(
        `.${ns.be('suggestion', 'list')} li`
      )!;
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const { offsetTop, scrollHeight } = highlightItem;

      if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= scrollHeight;
      }
      highlightedIndex.set(index);
      // TODO: use Volar generate dts to fix it.
      unref(inputRef.get().ref)?.setAttribute(
        'aria-activedescendant',
        `${listboxId.get()}-item-${highlightedIndex.get()}`
      );
    };

    const stopHandle = onClickOutside(listboxRef, () => {
      // Prevent closing if focus is inside popper content
      if (popperRef.get()?.isFocusInsideContent?.()) return
      if (suggestionVisible.get()) close()
    });

    onBeforeUnmount(() => {
      stopHandle?.();
    });

    onMounted(() => {
      // TODO: use Volar generate dts to fix it.
      unref(inputRef.get().ref)?.setAttribute('role', 'textbox');
      unref(inputRef.get().ref)?.setAttribute('aria-autocomplete', 'list');
      unref(inputRef.get().ref)?.setAttribute('aria-controls', 'id');
      unref(inputRef.get().ref)?.setAttribute(
        'aria-activedescendant',
        `${listboxId.get()}-item-${highlightedIndex.get()}`
      );
      // get readonly attr
      readonly = unref(inputRef.get().ref)!.hasAttribute('readonly');
    });

    defineExpose({
      /** @description the index of the currently highlighted item */
      highlightedIndex,
      /** @description autocomplete whether activated */
      activated,
      /** @description remote search loading status */
      loading,
      /** @description el-input component instance */
      inputRef,
      /** @description el-tooltip component instance */
      popperRef,
      /** @description fetch suggestions result */
      suggestions,
      /** @description triggers when a suggestion is clicked */
      handleSelect,
      /** @description handle keyboard enter event */
      handleKeyEnter,
      /** @description focus the input element */
      focus,
      /** @description blur the input element */
      blur,
      /** @description close suggestion */
      close,
      /** @description highlight an item in a suggestion */
      highlight,
      /** @description loading suggestion list */
      getData,
    });

    this.addChild(
      new TdTooltip({
        refEl: popperRef,
        visible: suggestionVisible,
        placement: props.placement,
        fallbackPlacements: ['bottom-start', 'top-start'],
        popperClass: [ns.e('popper'), props.popperClass],
        teleported: props.teleported,
        appendTo: props.appendTo,
        gpuAcceleration: false,
        pure: true,
        // manualMode: true, // todo 手动模式
        effect: 'light',
        trigger: 'click',
        transition: `${ns.namespace.get()}-zoom-in-top`,
        persistent: true,
        attrObj: {
          role: 'listbox',
        },
        emits: {
          beforeShow: onSuggestionShow,
          hide: onHide,
        },
        slot: new Div({
          refDom: listboxRef,
          // todo attrs
          class: [ns.b() /*, attrs.class*/],
          styleObj: styles,
          attrObj: {
            role: 'combobox',
            ariaHaspopup: 'listbox',
            ariaExpanded: suggestionVisible,
            ariaOwns: listboxId,
          },
          slot: new TdInput({
            refEl: inputRef,
            // v-bind: attrs"
            clearable: props.clearable,
            disabled: disabled,
            name: props.name,
            vModel: props.vModel,
            modelValue: props.modelValue,
            attrObj: {
              ariaLabel: props.ariaLabel,
            },
            emits: {
              change: handleChange,
              clear: handleClear,
              focus: handleFocus,
              input: handleInput,
              keydown: (evt) => {
                // .up.prevent
                if (evt?.code === 'up') {
                  highlight(highlightedIndex.get() - 1);
                  evt.preventDefault();
                } else if (evt?.code === 'down') {
                  highlight(highlightedIndex.get() + 1);
                  evt.preventDefault();
                } else if (evt?.code === 'enter') {
                  handleKeyEnter();
                } else if (evt?.code === 'tab') {
                  close();
                } else if (evt?.code === 'esc') {
                  handleKeyEscape(evt);
                }
              },
              mousedown: handleMouseDown,
            },
            events: {
              blur: handleBlur,
            },
            slots: {
              prepend: props.slots?.prepend,
              append: props.slots?.append,
              prefix: props.slots?.prefix,
              suffix: props.slots?.suffix,
            },
          }),
        }),
        slots: {
          content: new Div({
            refDom: regionRef,
            class: [
              ns.b('suggestion'),
              ns.is('loading', suggestionLoading.get()),
            ],
            styleObj: {
              [props.fitInputWidth ? 'width' : 'minWidth']: dropdownWidth,
              outline: 'none',
            },
            attrObj: {
              role: 'region',
            },
            slot: new TdScrollbar({
              tag: 'ul',
              wrapClass: ns.be('suggestion', 'wrap'),
              viewClass: ns.be('suggestion', 'list'),
              attrObj: {
                id: listboxId,
                role: 'listbox',
              },
              slot: computed(() => {
                console.warn('suggestionLoading.get() is ', suggestionLoading.get());
                if (suggestionLoading.get()) {
                  console.warn('suggestionLoading.get() is true');
                  return new LI({
                    slot: props.slots?.loading ?? new TdIcon({
                      class: ns.is('loading'),
                      slot: new ElLoadingSvg(),
                    }),
                  })
                } else {
                  console.warn('suggestions.get() is ', suggestions.get());
                  if (!suggestions.get().length) return;
                  return suggestions.get().map((item, index) => {
                    console.warn('item is ', item, ' and props.valueKey is ', props.valueKey);
                    return new LI({
                      class: { highlighted: highlightedIndex.get() === index },
                      attrObj: {
                        id: `${listboxId.get()}-item-${index}`,
                        role: 'option',
                        ariaSelected: highlightedIndex.get() === index,
                      },
                      events: {
                        click: () => handleSelect(item),
                      },
                      slot: item[props.valueKey!]
                    });
                  })
                }
              })
            })
          }),
        },
      })
    );
  }
}
