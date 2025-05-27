import {
  Div,
  Input,
  Span,
  TypeDiv,
  provide,
  Fragment,
  For,
} from '@type-dom/framework';
import { isArray, isFunction } from '@type-dom/utils';
import { Computed, computed, ToRefs, toRefs, unref } from '@type-dom/signals';
import { useCalcInputWidth } from '../../../hooks/use-calc-input-width';
import { TdTag } from '../../data/td-tag/td-tag.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { TdScrollbar } from '../../basic/td-scrollbar/td-scrollbar.class';
import { TdOption } from '../td-option/td-option.class';
import { OptionValue } from '../td-option/td-option.interface';
import { TdSelectDropdown } from './td-select-dropdown/td-select-dropdown.class';
import { TdOptions } from './td-options/td-options.class';
import { selectEmits, selectProps } from './td-select.const';
import { selectKey } from './token';
import { useSelect } from './useSelect';
import { ITdSelect, TdSelectProps } from './td-select.interface';
import './style';

export class TdSelect extends TypeDiv implements ITdSelect {
  className: 'TdSelect';
  override props: TdSelectProps;
  selectedLabel?: string | Computed<string | number | boolean | (string | number | boolean | undefined)[] | undefined>;

  constructor(params = {} as TdSelectProps) {
    super();
    this.className = 'TdSelect';
    this.addEmits(selectEmits);
    this.assignProps(selectProps);
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdSelect setup. ');
    const props = this.props;
    const emit = this.emit;

    const modelValue = computed(() => {
      // const { modelValue: rawModelValue, multiple } = props;
      const rawModelValue = props.vModel?.get() as  OptionValue | OptionValue[];
      const multiple = props.multiple;
      console.warn('rawModelValue is ', rawModelValue)
      const fallback = multiple ? [] : undefined;
      // When it is array, we check if this is multi-select.
      // Based on the result we get
      if (isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }

      return multiple ? fallback : rawModelValue;
    });

    const _props: ToRefs<TdSelectProps> = {
      ...toRefs(props),
      modelValue: modelValue,
    }


    const API = useSelect(_props, emit);
    const { nsSelect, nsInput, states } = API;
    const { calculatorRef, inputStyle } = useCalcInputWidth();

    provide(
      selectKey,
      // reactive(
      {
        props: _props,
        states: states,
        optionsArray: API.optionsArray.get(),
        handleOptionSelect: API.handleOptionSelect,
        onOptionCreate: API.onOptionCreate,
        onOptionDestroy: API.onOptionDestroy,
        selectRef: API.selectRef,
        setSelected: API.setSelected,
      }
    );

    this.selectedLabel = computed(() => {
      if (!props.multiple) {
        return unref(states.selectedLabel);
      }
      return states.selected.map((i) => i.currentLabel?.get());
    });

    this.assignProps({
      refDom: API.selectRef,
      //  v-click-outside:[popperRef]="handleClickOutside"
    });
    this.attr.addClass(
      computed(() => [nsSelect.b(), nsSelect.m(API.selectSize.get())])
    );
    // console.warn('API.mouseEnterEventName.get() is ', API.mouseEnterEventName.get());
    this.addEvents({
      [API.mouseEnterEventName.get()!]: () => states.inputHovering.set(true),
      mouseleave: () => states.inputHovering.set(false),
    });

    this.addChild(
      new TdTooltip({
        refEl: API.tooltipRef,
        visible: API.dropdownMenuVisible,
        placement: props.placement,
        teleported: props.teleported,
        popperClass: [nsSelect.e('popper'), props.popperClass],
        popperOptions: props.popperOptions,
        fallbackPlacements: props.fallbackPlacements,
        effect: props.effect,
        pure: true,
        trigger: 'click',
        transition: `${nsSelect.namespace.get()}-zoom-in-top`,
        stopPopperMouseEvent: false,
        gpuAcceleration: false,
        persistent: props.persistent,
        appendTo: props.appendTo,
        showArrow: props.showArrow,
        offset: props.offset,
        emits: {
          beforeShow: API.handleMenuEnter,
          hide: () => (states.isBeforeHide = false),
        },
        slot: new Div({
          refDom: API.wrapperRef,
          class: computed(() => [
            nsSelect.e('wrapper'),
            nsSelect.is('focused', API.isFocused.get()),
            nsSelect.is('hovering', states.inputHovering.get()),
            nsSelect.is('filterable', props.filterable),
            nsSelect.is('disabled', unref(API.selectDisabled)),
          ]),
          events: {
            click: (evt?: MouseEvent) => {
              // console.warn('click . ');
              API.toggleMenu();
              evt?.preventDefault();
            },
          },
          slot: [
            props.slots?.prefix
              ? new Div({
                  refDom: API.prefixRef,
                  class: nsSelect.e('prefix'),
                  slot: props.slots.prefix,
                })
              : undefined,
            new Div({
              refDom: API.selectionRef,
              class: [
                nsSelect.e('selection'),
                nsSelect.is(
                  'near',
                  props.multiple &&
                    !props.slots?.prefix &&
                    !!states.selected.length
                ),
              ],
              slot: [
                props.multiple
                  ? new Fragment({
                      slot: props.slots?.tag ?? [
                        new For({
                          data: API.showTagList,
                          getter: (item) =>
                            new Div({
                              // key: API.getValueKey(item),
                              class: nsSelect.e('selected-item'),
                              slot: new TdTag({
                                closable: !API.selectDisabled && !item.isDisabled,
                                size: API.collapseTagSize.get(),
                                type: props.tagType,
                                effect: props.tagEffect,
                                disableTransitions: true,
                                styleObj: API.tagStyle.get(),
                                emits: {
                                  close: (evt) => {
                                    API.deleteTag(evt, item);
                                  },
                                },
                                slot: new Span({
                                  class: nsSelect.e('tags-text'),
                                  slot:
                                    props.slots?.label?.(
                                      item.currentLabel,
                                      item.value
                                    ) ?? item.currentLabel,
                                }),
                              }),
                            }),
                        }),
                        new TdTooltip({
                          vIf:
                            props.collapseTags &&
                            states.selected.length > props.maxCollapseTags!,
                          refEl: API.tagTooltipRef,
                          disabled:
                            API.dropdownMenuVisible || !props.collapseTagsTooltip,
                          fallbackPlacements: ['bottom', 'top', 'right', 'left'],
                          effect: props.effect,
                          placement: 'bottom',
                          teleported: props.teleported,
                          slots: {
                            default: new Div({
                              refDom: API.collapseItemRef,
                              class: nsSelect.e('selected-item'),
                              slot: new TdTag({
                                closable: false,
                                size: API.collapseTagSize.get(),
                                type: props.tagType,
                                effect: props.tagEffect,
                                disableTransitions: true,
                                styleObj: API.collapseTagStyle,
                                slot: new Span({
                                  class: nsSelect.e('tags-text'),
                                  slot: `+${states.selected.length - props.maxCollapseTags!}`,
                                }),
                              }),
                            }),
                            content: new Div({
                              refDom: API.tagMenuRef,
                              class: nsSelect.e('selection'),
                              slot: new For({
                                data: API.collapseTagList,
                                getter: (item: any) =>
                                  new Div({
                                    // key: API.getValueKey(item),
                                    class: nsSelect.e('selected-item'),
                                    slot: new TdTag({
                                      class: 'in-tooltip',
                                      closable:
                                        !API.selectDisabled && !item.isDisabled,
                                      size: API.collapseTagSize.get(),
                                      type: props.tagType,
                                      effect: props.tagEffect,
                                      disableTransitions: true,
                                      emits: {
                                        close: (evt) => {
                                          API.deleteTag(evt, item);
                                        },
                                      },
                                      slot: new Span({
                                        class: nsSelect.e('tags-text'),
                                        slot: isFunction(props.slots?.label)
                                          ? props.slots?.label(
                                              item.currentLabel,
                                              item.vlaue
                                            )
                                          : item.currentLabel,
                                      }),
                                    }),
                                  }),
                              }),
                            }),
                          },
                        }),
                      ],
                    })
                  : undefined,
                new Div({
                  class: [
                    nsSelect.e('selected-item'),
                    nsSelect.e('input-wrapper'),
                    nsSelect.is('hidden', !props.filterable),
                  ],
                  slot: [
                    new Input({
                      refDom: API.inputRef,
                      vModel: states.inputValue,
                      attrObj: {
                        id: API.inputId.get(),
                        type: 'text',
                        name: props.name,
                        class: [nsSelect.e('input'), nsSelect.is(API.selectSize.get())],
                        disabled: API.selectDisabled,
                        autocomplete: props.autocomplete,
                        tabindex: props.tabindex,
                        role: 'combobox',
                        readonly: !props.filterable,
                        spellcheck: false,
                        ariaActivedescendant: (API.hoverOption.get() as any)?.id || '',
                        ariaControls: API.contentId.get(),
                        ariaExpanded: API.dropdownMenuVisible,
                        ariaLabel: props.ariaLabel,
                        ariaAutocomplete: 'none',
                        ariaHaspopup: 'listbox',
                      },
                      styleObj: inputStyle,
                      events: {
                        keydown: (evt) => {
                          if (evt?.key === 'Down') {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            API.navigateOptions('next');
                          }
                          if (evt?.key === 'Up') {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            API.navigateOptions('prev');
                          }
                          if (evt?.key === 'Escape') {
                            evt?.preventDefault();
                            evt?.stopPropagation();
                            API.handleEsc();
                          }
                          if (evt?.key === 'Enter') {
                            evt?.stopPropagation();
                            evt?.preventDefault();
                            API.selectOption();
                          }
                          if (evt?.key === 'Delete') {
                            evt?.stopPropagation();
                            API.deletePrevTag(evt);
                          }
                        },
                        compositionstart: API.handleCompositionStart,
                        compositionupdate: API.handleCompositionUpdate,
                        compositionend: API.handleCompositionEnd,
                        input: API.onInput,
                        click: (evt) => {
                          evt?.stopPropagation();
                          API.toggleMenu();
                        },
                      },
                    }),
                    new Span({
                      vIf: props.filterable,
                      refDom: calculatorRef,
                      class: nsSelect.e('input-calculator'),
                      attrObj: {
                        ariaHidden: true,
                      },
                      slot: states.inputValue,
                    }),
                  ],
                }),
                new Div({
                  vIf: API.shouldShowPlaceholder,
                  class: computed(() => [
                    nsSelect.e('selected-item'),
                    nsSelect.e('placeholder'),
                    nsSelect.is(
                      'transparent',
                      !API.hasModelValue.get() ||
                        (API.expanded.get() && !states.inputValue.get())
                    ),
                  ]),
                  slot: computed(() => {
                    console.warn('API.hasModelValue.get() is ', API.hasModelValue.get());
                    if (API.hasModelValue.get()) {
                      if (props.slots?.label) {
                        return props.slots?.label?.(
                          unref(API.currentPlaceholder),
                          modelValue.get()
                        );
                      } else {
                        return new Span({
                          slot: API.currentPlaceholder.get(),
                        });
                      }
                    } else {
                      return new Span({
                        slot: API.currentPlaceholder.get(),
                      });
                    }
                  }),
                }),
              ],
            }),
            new Div({
              refDom: API.suffixRef,
              class: nsSelect.e('suffix'),
              slot: [
                new TdIcon({
                  vIf: computed(
                    () => API.iconComponent.get() && !API.showClose.get()
                  ),
                  class: [
                    nsSelect.e('caret'),
                    nsSelect.e('icon'),
                    API.iconReverse,
                  ],
                  slot:
                    API.iconComponent.get() &&
                    new (API.iconComponent.get() as any)(),
                }),
                new TdIcon({
                  vIf: computed(() => {
                    console.warn('API.showClose.get() is ', API.showClose.get())
                    return API.showClose.get() && props.clearIcon;
                  }),
                  class: [
                    nsSelect.e('caret'),
                    nsSelect.e('icon'),
                    nsSelect.e('clear'),
                  ],
                  slot: new (props.clearIcon as any)(),
                  events: {
                    click: API.handleClearClick,
                  },
                }),
                new TdIcon({
                  vIf: computed(
                    () =>
                      API.validateState.get() &&
                      API.validateIcon.get() &&
                      API.needStatusIcon.get()
                  ),
                  class: [
                    nsInput.e('icon'),
                    nsInput.e('validateIcon'),
                    nsInput.is('loading', API.validateState.get() === 'validating'),
                  ],
                  slot:
                    API.validateIcon.get() &&
                    new (API.validateIcon.get() as any)(),
                }),
              ],
            }),
          ],
        }),
        slots: {
          content: new TdSelectDropdown({
            refDom: API.menuRef,
            slot: [
              new Div({
                vIf: props.slots?.header,
                class: nsSelect.be('dropdown', 'header'),
                slot: props.slots?.header,
                events: {
                  click: (evt) => evt?.stopPropagation(),
                },
              }),
              new TdScrollbar({
                vShow: computed(
                  () => {
                    // console.error('API.states.options.get().size > 0 && !unref(props.loading) is ',
                    //   states.options.get().size);
                    return (
                      states.options.get().size > 0 && !unref(props.loading)
                    );
                  } // todo
                ),
                refEl: API.scrollbarRef,
                tag: 'ul',
                wrapClass: nsSelect.be('dropdown', 'wrap'),
                viewClass: nsSelect.be('dropdown', 'list'),
                class: [
                  computed(() =>
                    nsSelect.is('empty', API.filteredOptionsCount.get() === 0)
                  ),
                ],
                attrObj: {
                  id: API.contentId,
                  role: 'listbox',
                  ariaLabel: props.ariaLabel,
                  ariaOrientation: 'vertical',
                },
                emits: {
                  scroll: API.popupScroll,
                },
                slot: [
                  new TdOption({
                    vIf: API.showNewOption,
                    value: states.inputValue, // 这里的value是会变的，是选中的值
                    created: true,
                  }),
                  new TdOptions({
                    // todo
                    slot: props.slot, // 这里面的 TdOption的value的值是不变的。
                  }),
                ],
              }),
              props.slots?.loading && unref(props.loading)
                ? new Div({
                    class: nsSelect.be('dropdown', 'loading'),
                    slot: props.slots?.loading,
                  })
                : unref(props.loading) || API.filteredOptionsCount.get() === 0
                ? new Div({
                    class: nsSelect.be('dropdown', 'empty'),
                    slot:
                      props.slots?.empty ??
                      new Span({
                        slot: API.emptyText,
                      }),
                  })
                : undefined,
              new Div({
                vIf: props.slots?.footer,
                class: nsSelect.be('dropdown', 'footer'),
                events: {
                  click: (evt) => evt?.stopPropagation(),
                },
                slot: props.slots?.footer,
              }),
            ],
          }),
        },
      })
    );
  }
}
