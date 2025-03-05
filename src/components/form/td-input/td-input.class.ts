import { isClient, debugWarn, isNil, isObject, NOOP } from '@type-dom/utils';
import {
  Div,
  Fragment,
  Input,
  Span,
  Textarea,
  TypeDiv,
  useAttrs as useRawAttrs,
  defineExpose,
  nextTick,
  onMounted,
  useResizeObserver,
  useSlots, StyleValue
} from '@type-dom/framework';
import {
  Computed,
  computed,
  Ref,
  signal,
  toRef,
  unref,
  watch,
} from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import {
  ElCircleCloseSvg,
  ElHideSvg,
  ElViewSvg,
  ValidateComponentsMap,
} from '@type-dom/svgs';
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { useAttrs } from '../../../hooks/use-attrs';
import { useFocusController } from '../../../hooks/use-focus-controller/index';
import { useComposition } from '../../../hooks/use-composition';
import { useNamespace } from '../../../hooks/use-namespace';
import { useCursor } from '../../../hooks/use-cursor';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import {
  useFormDisabled,
  useFormSize,
} from '../td-form/hooks/use-form-common-props';
import { calcTextareaHeight } from './utils';
import {
  ITdInput,
  TdInputProps,
  TargetElement,
  InputAutoSize,
} from './td-input.interface';
import { inputEmits, inputProps } from './td-input.const';
import './style/index';

export class TdInput extends TypeDiv implements ITdInput {
  className: 'TdInput';
  override props: TdInputProps;

  input?: Ref<HTMLInputElement | undefined>;
  textarea?: Ref<HTMLTextAreaElement | undefined>;
  ref?: Computed<HTMLInputElement | HTMLTextAreaElement | undefined>;
  textareaStyle?: Computed<any>;
  autosize?: Ref<InputAutoSize>;
  isComposing?: Ref<boolean>;
  focus?: () => void | undefined;
  blur?: () => void | undefined;
  select?: () => void;
  clear?: () => void;
  resizeTextarea?: () => void;

  constructor(params: TdInputProps = {}) {
    super();
    // console.log('TdInput constructor . ');
    this.className = 'TdInput';
    this.attr.addObj({
      name: 'td-input',
    });

    this.addEmits(inputEmits);
    this.assignProps(inputProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const rawAttrs = useRawAttrs()
    const attrs = useAttrs();
    const slots = useSlots();

    const containerKls = computed(() => [
      props.type === 'textarea' ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.get()),
      nsInput.is('disabled', inputDisabled.get()),
      nsInput.is('exceed', inputExceed.get()),
      // todo object type
      {
        [nsInput.b('group')]: slots?.prepend || slots?.append,
        [nsInput.m('prefix')]: slots?.prefix || props.prefixIcon,
        [nsInput.m('suffix')]:
          slots?.suffix ||
          props.suffixIcon ||
          props.clearable ||
          props.showPassword,
        [nsInput.bm('suffix', 'password-clear')]:
          showClear.get() && showPwdVisible.get(),
        [nsInput.b('hidden')]: props.type === 'hidden',
      },
      rawAttrs?.class,
    ]);

    const wrapperKls = computed(() => [
      nsInput.e('wrapper'),
      nsInput.is('focus', isFocused.get()),
    ]);

    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem,
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace('input');
    const nsTextarea = useNamespace('textarea');

    const input = signal<HTMLInputElement>();
    const textarea = signal<HTMLTextAreaElement>();

    const hovering = signal(false);
    const passwordVisible = signal(false);
    const countStyle = signal<IStyle>();
    const textareaCalcStyle = signal(props.inputStyle);

    const _ref = computed(() => input.get() || textarea.get());

    // wrapperRef for type="text", handleFocus and handleBlur for type="textarea"
    const { wrapperRef, isFocused, handleFocus, handleBlur } =
      useFocusController(_ref, {
        beforeFocus() {
          return inputDisabled.get();
        },
        afterBlur() {
          if (props.validateEvent) {
            elFormItem?.validate?.('blur').catch((err) => debugWarn(err));
          }
        },
      });
    // console.warn('wrapperRef is ', wrapperRef);

    const needStatusIcon = computed(() => elForm?.statusIcon ?? false);
    const validateState = computed(
      () => unref(elFormItem?.validateState) || ''
    );
    const validateIcon = computed(
      () =>
        validateState.get() &&
        (ValidateComponentsMap as any)[validateState.get()]
    );
    const passwordIcon = computed(() =>
      passwordVisible.get() ? new ElViewSvg() : new ElHideSvg()
    );
    const containerStyle = computed<StyleValue>(() => [
      rawAttrs?.style as StyleValue,
    ])
    const textareaStyle = computed<StyleValue>(() => [
        props.inputStyle,
        textareaCalcStyle.get(),
        {
          resize: props.resize,
        }
      ]
    )
    const nativeInputValue = computed(() =>
      isNil(props.vModel?.get()) ? '' : String(props.vModel?.get())
    );
    const showClear = computed(
      () =>
        props.clearable &&
        !inputDisabled.get() &&
        !props.readonly &&
        !!nativeInputValue.get() &&
        (isFocused.get() || hovering.get())
    );
    const showPwdVisible = computed(
      () =>
        props.showPassword &&
        !inputDisabled.get() &&
        !!nativeInputValue.get() &&
        (!!nativeInputValue.get() || isFocused.get())
    );
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!props.maxlength &&
        (props.type === 'text' || props.type === 'textarea') &&
        !inputDisabled.get() &&
        !props.readonly &&
        !props.showPassword
    );
    const textLength = computed(() => nativeInputValue.get().length);
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.get() && textLength.get() > Number(props.maxlength)
    );
    const suffixVisible = computed(
      () =>
        !!slots?.suffix ||
        !!props.suffixIcon ||
        showClear.get() ||
        props.showPassword ||
        isWordLimitVisible.get() ||
        (!!validateState.get() && needStatusIcon.get())
    );
    // console.log('suffixVisible is ', suffixVisible);
    const [recordCursor, setCursor] = useCursor(input);

    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.get() || props.resize !== 'both') {
        return;
      }
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.set({
        /** right: 100% - width + padding(15) + right(6) */
        right: `calc(100% - ${width + 15 + 6}px)`,
      });
    });

    const resizeTextarea = () => {
      const { type, autosize } = props;

      if (!isClient || type !== 'textarea' || !textarea.get()) {
        return;
      }

      if (autosize) {
        const minRows = isObject(autosize)
          ? autosize.minRows
          : undefined;
        const maxRows = isObject(autosize)
          ? autosize.maxRows
          : undefined;
        const textareaStyle = calcTextareaHeight(
          textarea.get()!,
          minRows,
          maxRows
        );

        // If the scrollbar is displayed, the height of the textarea needs more space than the calculated height.
        // If set textarea height in this case, the scrollbar will not hide.
        // So we need to hide scrollbar first, and reset it in next tick.
        // see https://github.com/element-plus/element-plus/issues/8825
        textareaCalcStyle.set({
          overflowY: 'hidden',
          ...textareaStyle,
        });

        nextTick(() => {
          // NOTE: Force repaint to make sure the style set above is applied.
          textarea.get()!.offsetHeight;
          textareaCalcStyle.set(textareaStyle);
        });
      } else {
        textareaCalcStyle.set({
          minHeight: calcTextareaHeight(textarea.get()!).minHeight,
        });
      }
    };

    const createOnceInitResize = (resizeTextarea: () => void) => {
      let isInit = false;
      return () => {
        if (isInit || !props.autosize) {
          return;
        }
        const isElHidden = textarea.get()?.offsetParent === null;
        if (!isElHidden) {
          resizeTextarea();
          isInit = true;
        }
      };
    };
    // fix: https://github.com/element-plus/element-plus/issues/12074
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);

    const setNativeInputValue = () => {
      // console.warn('setNativeInputValue . ');
      const input = _ref.get();
      const formatterValue = props.formatter
        ? props.formatter(nativeInputValue.get())
        : nativeInputValue.get();
      // console.warn('formatterValue is ', formatterValue);
      if (!input || input.value === formatterValue) {
        return;
      }
      input.value = formatterValue;
    };

    const handleInput = async (event?: Event) => {
      // console.warn('handleInput . event is ', event);
      recordCursor();

      let { value } = event?.target as TargetElement;

      if (props.formatter) {
        value = props.parser ? props.parser(value) : value;
      }

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.get()) {
        return;
      }

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.get()) {
        setNativeInputValue();
        return;
      }

      emit(UPDATE_MODEL_EVENT, value);
      // console.warn('then emit(INPUT_EVENT) , value is ', value);
      emit(INPUT_EVENT, value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      await nextTick();
      setNativeInputValue();
      setCursor();
    };

    const handleChange = (event?: Event) => {
      emit('change', (event?.target as TargetElement).value);
    };

    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
    } = useComposition({ emit: this.emit, afterComposition: handleInput });

    const handlePasswordVisible = () => {
      recordCursor();
      passwordVisible.set(!passwordVisible.get());
      // The native input needs a little time to regain focus
      setTimeout(setCursor);
    };

    const focus = () => _ref.get()?.focus();

    const blur = () => _ref.get()?.blur();

    const handleMouseLeave = (evt?: MouseEvent) => {
      hovering.set(false);
      emit('mouseleave', evt); // todo 循环调用了
    };

    const handleMouseEnter = (evt?: MouseEvent) => {
      hovering.set(true);
      emit('mouseenter', evt); // todo 循环调用了
    };

    const handleKeydown = (evt?: KeyboardEvent) => {
      emit('keydown', evt); // todo 循环调用了
    };

    const select = () => {
      _ref.get()?.select();
    };

    const clear = () => {
      // console.warn('clear . ');
      emit(UPDATE_MODEL_EVENT, '');
      emit('change', '');
      emit('clear');
      emit(INPUT_EVENT, '');
    };

    watch(
      () => props.vModel?.get(),
      () => {
        nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          elFormItem?.validate?.('change').catch((err) => debugWarn(err));
        }
      }
    );

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => setNativeInputValue());

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(
      () => unref(props.type),
      async () => {
        await nextTick();
        setNativeInputValue();
        resizeTextarea();
      }
    );

    onMounted(() => {
      if (!props.formatter && props.parser) {
        debugWarn(
          'TdInput',
          'If you set the parser, you also need to set the formatter.'
        );
      }
      setNativeInputValue();
      nextTick(resizeTextarea);
    });

    defineExpose({
      /** @description HTML input element */
      input,
      /** @description HTML textarea element */
      textarea,
      /** @description HTML element, input or textarea */
      ref: _ref,
      /** @description style of textarea. */
      textareaStyle,

      /** @description from props (used on unit test) */
      autosize: toRef(props, 'autosize'),

      /** @description is input composing */
      isComposing,

      /** @description HTML input element native method */
      focus,
      /** @description HTML input element native method */
      blur,
      /** @description HTML input element native method */
      select,
      /** @description clear input value */
      clear,
      /** @description resize textarea. */
      resizeTextarea,
    });

    this.attr.addClass([
      containerKls,
      {
        [nsInput.bm('group', 'append')]: props.slots?.append,
        [nsInput.bm('group', 'prepend')]: props.slots?.prepend,
      },
    ]);
    this.style.addObj(containerStyle);
    this.addEvents({
      mouseenter: handleMouseEnter,
      mouseleave: handleMouseLeave,
    });
    // input
    if (props.type !== 'textarea') {
      if (slots?.prepend) {
        this.addChild(
          new Span({
            class: nsInput.be('group', 'prepend'),
            slot: slots.prepend,
          })
        );
      }
      this.addChild(
        new Div({
          refDom: wrapperRef,
          class: wrapperKls,
          slot: [
            //  prefix slot
            new Span({
              vIf: slots?.prefix || props.prefixIcon,
              class: nsInput.e('prefix'),
              slot: [
                new Span({
                  class: nsInput.e('prefix-inner'),
                  slot: [
                    new Fragment({
                      slot: slots?.prefix
                    }),
                    new TdIcon({
                      vIf: props.prefixIcon,
                      class: nsInput.e('icon'),
                      slot: props.prefixIcon,
                    }),
                  ],
                }),
              ],
            }),
            new Input({
              refDom: input,
              class: nsInput.e('inner'),
              // v-bind="attrs" todo attr 到底对应什么 父组件的所有属性
              attrObj: {
                id: inputId.get(),
                minlength: props.minlength,
                maxlength: props.maxlength,
                type: computed(() =>
                  props.showPassword
                    ? passwordVisible.get()
                      ? 'text'
                      : 'password'
                    : props.type
                ),
                disabled: inputDisabled,
                readonly: props.readonly,
                autocomplete: props.autocomplete,
                tabindex: props.tabindex,
                ariaLabel: props.ariaLabel,
                placeholder: props.placeholder,
                form: props.form,
                autofocus: props.autofocus,
                role: props.containerRole,
              },
              styleObj: props.inputStyle,
              events: {
                compositionstart: handleCompositionStart,
                compositionupdate: handleCompositionUpdate,
                compositionend: handleCompositionEnd,
                input: handleInput,
                change: handleChange,
                keydown: handleKeydown,
              },
            }),
            // suffix slot
            new Span({
              vIf: suffixVisible,
              class: nsInput.e('suffix'),
              slot: new Span({
                class: nsInput.e('suffix-inner'),
                slot: [
                  new Fragment({
                    vIf: computed(
                      () =>
                        !showClear.get() ||
                        !showPwdVisible.get() ||
                        !isWordLimitVisible.get()
                    ),
                    slot: [
                      new Fragment({
                        slot: slots?.suffix,
                      }),
                      new TdIcon({
                        vIf: props.suffixIcon,
                        class: nsInput.e('icon'),
                        slot: props.suffixIcon,
                      }),
                    ],
                  }),
                  new TdIcon({
                    vIf: showClear,
                    class: [nsInput.e('icon'), nsInput.e('clear')],
                    events: {
                      mousedown: (evt) => {
                        NOOP();
                        evt?.preventDefault();
                      },
                      click: clear,
                    },
                    slot: new ElCircleCloseSvg(),
                  }),
                  new TdIcon({
                    vIf: showPwdVisible,
                    class: [nsInput.e('icon'), nsInput.e('password')],
                    events: {
                      click: handlePasswordVisible,
                    },
                    slot: passwordIcon,
                  }),
                  new Span({
                    vIf: isWordLimitVisible,
                    class: nsInput.e('count'),
                    slot: new Span({
                      class: nsInput.e('count-inner'),
                      slot: computed(
                        () =>
                          (textLength.get() + ' / ' + props.maxlength)
                      ),
                    }),
                  }),
                  new TdIcon({
                    vIf: validateState && validateIcon && needStatusIcon,
                    class: [
                      nsInput.e('icon'),
                      nsInput.e('validateIcon'),
                      nsInput.is(
                        'loading',
                        validateState.get() === 'validating'
                      ),
                    ],
                    slot: validateIcon.get() && new (validateIcon.get())()
                  }),
                ],
              }),
            }),
          ],
        })
      );
      // append slot
      if (slots?.append) {
        this.addChild(
          new Div({
            vIf: slots?.append,
            class: nsInput.be('group', 'append'),
            slot: slots.append,
          })
        );
      }
    } else {
      // textarea
      this.addChildren(
        new Textarea({
          refDom: textarea,
          styleObj: textareaStyle,
          attrObj: {
            id: inputId.get(),
            class: computed(() => [
              nsTextarea.e('inner'),
              nsInput.is('focus', isFocused.get()),
            ]),
            // v-bind="attrs" todo attr 到底对应什么 父组件的所有属性
            minlength: props.minlength,
            maxlength: props.maxlength,
            tabindex: props.tabindex,
            disabled: inputDisabled,
            readonly: props.readonly,
            autocomplete: props.autocomplete,
            ariaLabel: props.ariaLabel,
            placeholder: props.placeholder,
            form: props.form,
            autofocus: props.autofocus,
            rows: props.rows,
            role: props.containerRole,
          },
          events: {
            compositionstart: handleCompositionStart,
            compositionupdate: handleCompositionUpdate,
            compositionend: handleCompositionEnd,
            input: handleInput,
            focus: handleFocus,
            blur: handleBlur,
            change: handleChange,
            keydown: handleKeydown,
          },
        }),
        new Span({
          vIf: isWordLimitVisible,
          styleObj: countStyle,
          class: nsInput.e('count'),
          slot: computed(
            () => (textLength.get() + ' / ' + props.maxlength) as string
          ),
        })
      );
    }
  }
}
