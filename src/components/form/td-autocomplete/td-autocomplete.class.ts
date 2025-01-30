import {
  defineExpose,
  Div,
  onBeforeUnmount,
  onClickOutside,
  onMounted,
  Transition,
  TypeFragment,
  useAttrs as useRawAttrs,
} from '@type-dom/framework';
import { debounce, isArray, throwError } from '@type-dom/utils';
import { computed, signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { useAttrs } from '../../../hooks/use-attrs';
import { useId } from '../../../hooks/use-id';
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { TdInput } from '../td-input/td-input.class';
import { useFormDisabled } from '../td-form/hooks/use-form-common-props';
import {
  AutocompleteProps,
  ITdAutoComplete,
} from './td-autocomplete.interface';
import {
  AutocompleteData,
  autocompleteEmits,
  autocompleteProps,
} from './td-autocomplete.const';

export class TdAutocomplete extends TypeFragment implements ITdAutoComplete {
  className: 'TdAutoComplete';
  override props: AutocompleteProps;

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
    const rawAttrs = useRawAttrs();
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
    const styles = computed(() => rawAttrs?.style as IStyle);

    const suggestionVisible = computed(() => {
      const isValidData = suggestions.get().length > 0;
      return (isValidData || loading.get()) && activated.get();
    });

    const suggestionLoading = computed(
      () => !props.hideLoading && loading.get()
    );

    const refInput = computed<HTMLInputElement[]>(() => {
      if (inputRef.get()) {
        return Array.from<HTMLInputElement>(
          inputRef.get()?.dom?.querySelectorAll('input')!
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
        if (isArray(result)) cb(result);
      }
    };
    const debouncedGetData = debounce(getData, props.debounce!);

    const handleInput = (value?: string) => {
      const valuePresented = !!value;

      emit(INPUT_EVENT, value);
      emit(UPDATE_MODEL_EVENT, value);

      // suggestionDisabled.set(false)
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
      if (disabled.get()) return;
      if (
        (event?.target as HTMLElement)?.tagName !== 'INPUT' ||
        refInput.get().includes(document.activeElement as HTMLInputElement)
      ) {
        activated.set(true);
      }
    };

    const handleChange = (value?: string) => {
      emit(CHANGE_EVENT, value);
    };

    const handleFocus = (evt?: FocusEvent) => {
      if (!ignoreFocusEvent) {
        activated.set(true);
        emit('focus', evt);

        if (props.triggerOnFocus && !readonly) {
          debouncedGetData(String(props.modelValue));
        }
      } else {
        ignoreFocusEvent = false;
      }
    };

    const handleBlur = (evt?: FocusEvent) => {
      setTimeout(() => {
        // validate current focus event is inside el-tooltip-content
        // if so, ignore the blur event and the next focus event
        if (popperRef.get()?.isFocusInsideContent?.()) {
          ignoreFocusEvent = true;
          return;
        }
        activated.get() && close();
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
        emit('select', { value: props.modelValue });
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
      inputRef.get()?.dom?.focus();
    };

    const blur = () => {
      inputRef.get()?.dom?.blur();
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
      const suggestion = regionRef
        .get()!
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
      (inputRef.get() as any).ref!.setAttribute(
        'aria-activedescendant',
        `${listboxId.get()}-item-${highlightedIndex.get()}`
      );
    };

    const stopHandle = onClickOutside(listboxRef, () => {
      suggestionVisible.get() && close();
    });

    onBeforeUnmount(() => {
      stopHandle?.();
    });

    onMounted(() => {
      // TODO: use Volar generate dts to fix it.
      (inputRef.get() as any).ref!.setAttribute('role', 'textbox');
      (inputRef.get() as any).ref!.setAttribute('aria-autocomplete', 'list');
      (inputRef.get() as any).ref!.setAttribute('aria-controls', 'id');
      (inputRef.get() as any).ref!.setAttribute(
        'aria-activedescendant',
        `${listboxId.get()}-item-${highlightedIndex.get()}`
      );
      // get readonly attr
      readonly = (inputRef.get() as any).ref!.hasAttribute('readonly');
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
            ariaExpanded: suggestionVisible.get(),
            ariaOwns: 'listboxId',
          },
          slot: new TdInput({
            refEl: inputRef,
            // v-bind: attrs"
            clearable: props.clearable,
            disabled: disabled,
            // name: name as string,
            modelValue: props.modelValue as string,
            attrObj: {
              ariaLabel: 'ariaLabel',
            },
            emits: {
              input: (evt) => {
                // todo
                handleInput((evt?.target as HTMLInputElement).value);
              },
              change: (evt) => {
                // todo
                handleChange((evt?.target as HTMLInputElement).value);
              },
              focus: handleFocus,
              blur: handleBlur,
              clear: handleClear,
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
            slots: {
              prepend: props.slots?.prepend,
              append: props.slots?.append,
              prefix: props.slots?.prefix,
              suffix: props.slots?.suffix,
            },
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
            }),
          },
        }),
      })
    );
  }
}
