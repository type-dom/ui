import {
  TypeFragment,
  defineExpose,
  inject,
  nextTick,
  useAttrs,
  onClickOutside,
  unrefElement,
  TypeNode,
  provide,
  onBeforeUnmount,
  Transition,
  TypeFragmentProps,
} from '@type-dom/framework';
import { ComputePositionConfig as Options } from '@type-dom/popper';
import type { Dayjs } from 'dayjs';
import { debugWarn, isArray, isEqual } from '@type-dom/utils';
import { computed, signal, unref, watch, Ref } from '@type-dom/signals';
import { useLocale } from '../../../../hooks/use-locale';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useFocusController } from '../../../../hooks/use-focus-controller';
import {
  EmptyValuesContext,
  useEmptyValues,
} from '../../../../hooks/use-empty-values';
import { EVENT_CODE } from '../../../../constants/aria';
import { TdTooltip } from '../../../feedback/td-tooltip/td-tooltip.class';
import { TdInput } from '../../td-input/td-input.class';
import { useFormItem } from '../../td-form/hooks/use-form-item';
import { dayOrDaysToDate, formatter, parseDate, valueEquals } from '../utils';
import {
  type DateModelType,
  type DayOrDays,
  type PickerOptions,
  type SingleOrRange,
  timePickerDefaultProps,
  TimePickerDefaultProps,
  type UserInput,
} from './props';
import { TdPopper } from '../../../feedback/td-popper/td-popper.class';
import { ElCalendarSvg, ElClockSvg } from '@type-dom/svgs';
import { useFormSize } from '../../td-form/hooks/use-form-common-props';
import { PickerRangeTrigger } from './picker-range-trigger.class';

export class Picker extends TypeFragment {
  className: 'Picker';
  override props: TimePickerDefaultProps & TypeFragmentProps;

  constructor(params: TimePickerDefaultProps = {}) {
    super();
    this.className = 'Picker';

    this.assignProps(timePickerDefaultProps);
    this.props = this.useParams(params) as TimePickerDefaultProps &
      TypeFragmentProps;
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const attrs = useAttrs();

    const { lang } = useLocale();

    const nsDate = useNamespace('date');
    const nsInput = useNamespace('input');
    const nsRange = useNamespace('range');

    const { form, formItem } = useFormItem();
    const tdPopperOptions = inject('TdPopperOptions', {} as Options);
    const { valueOnClear } = useEmptyValues(
      props as EmptyValuesContext,
      undefined
    );

    const refPopper = signal<TdTooltip>();
    const inputRef = signal<TdInput | undefined>();
    const pickerVisible = signal(false);
    const pickerActualVisible = signal(false);
    const valueOnOpen = signal<
      TimePickerDefaultProps['modelValue'] | undefined
    >(undefined);
    let hasJustTabExitedInput = false;

    const { isFocused, handleFocus, handleBlur } = useFocusController(
      inputRef as any,
      {
        beforeFocus() {
          return props.readonly || unref(pickerDisabled.get());
        },
        afterFocus() {
          pickerVisible.set(true);
        },
        beforeBlur(event) {
          return (
            !hasJustTabExitedInput &&
            (refPopper.get() as any)?.isFocusInsideContent(event)
          );
        },
        afterBlur() {
          handleChange();
          pickerVisible.set(false);
          hasJustTabExitedInput = false;
          props.validateEvent &&
            formItem?.validate('blur').catch((err) => debugWarn(err));
        },
      }
    );

    const rangeInputKls = computed(() => [
      nsDate.b('editor'),
      nsDate.bm('editor', props.type),
      nsInput.e('wrapper'),
      nsDate.is('disabled', pickerDisabled.get()),
      nsDate.is('active', pickerVisible.get()),
      nsRange.b('editor'),
      pickerSize ? nsRange.bm('editor', pickerSize.get()) : '',
      // attrs.class, // todo
    ]);

    const clearIconKls = computed(() => [
      nsInput.e('icon'),
      nsRange.e('close-icon'),
      !showClose.get() ? nsRange.e('close-icon--hidden') : '',
    ]);

    watch(pickerVisible, (val) => {
      if (!val) {
        userInput.set(undefined);
        nextTick(() => {
          emitChange(props.modelValue);
        });
      } else {
        nextTick(() => {
          if (val) {
            valueOnOpen.set(props.modelValue);
          }
        });
      }
    });
    const emitChange = (
      val: TimePickerDefaultProps['modelValue'] | undefined,
      isClear?: boolean
    ) => {
      // determine user real change only
      if (isClear || !valueEquals(val, valueOnOpen.get())) {
        emit('change', val);
        props.validateEvent &&
          formItem?.validate('change').catch((err) => debugWarn(err));
      }
    };
    const emitInput = (input: SingleOrRange<DateModelType> | undefined) => {
      if (!valueEquals(props.modelValue, input)) {
        let formatted;
        if (isArray(input)) {
          formatted = input.map((item) =>
            formatter(item, props.valueFormat, lang.get())
          );
        } else if (input) {
          formatted = formatter(input, props.valueFormat, lang.get());
        }
        emit('update:modelValue', input ? formatted : input, lang.get());
      }
    };
    const emitKeydown = (e: KeyboardEvent) => {
      emit('keydown', e);
    };

    const refInput = computed<HTMLInputElement[]>(() => {
      if (inputRef) {
        return Array.from<HTMLInputElement>(
          inputRef.get()?.dom?.querySelectorAll?.('input')!
        );
      }
      return [];
    });

    const setSelectionRange = (
      start: number,
      end: number,
      pos?: 'min' | 'max'
    ) => {
      const _inputs = refInput.get();
      if (!_inputs.length) return;
      if (!pos || pos === 'min') {
        _inputs[0].setSelectionRange(start, end);
        _inputs[0].focus();
      } else if (pos === 'max') {
        _inputs[1].setSelectionRange(start, end);
        _inputs[1].focus();
      }
    };

    const onPick = (date: any = '', visible = false) => {
      pickerVisible.set(visible);
      let result;
      if (isArray(date)) {
        result = date.map((_) => _.toDate());
      } else {
        // clear btn emit undefined
        result = date ? date.toDate() : date;
      }
      userInput.set(undefined);
      emitInput(result);
    };

    const onBeforeShow = () => {
      pickerActualVisible.set(true);
    };

    const onShow = () => {
      emit('visible-change', true);
    };

    const onHide = () => {
      pickerActualVisible.set(false);
      pickerVisible.set(false);
      emit('visible-change', false);
    };

    const handleOpen = () => {
      pickerVisible.set(true);
    };

    const handleClose = () => {
      pickerVisible.set(false);
    };

    const pickerDisabled = computed(() => {
      return props.disabled || unref(form?.disabled);
    });

    const parsedValue = computed(() => {
      let dayOrDays: DayOrDays;
      if (valueIsEmpty.get()) {
        if (pickerOptions.get().getDefaultValue) {
          dayOrDays = pickerOptions.get().getDefaultValue?.()!;
        }
      } else {
        if (isArray(props.modelValue)) {
          dayOrDays = (props.modelValue as Array<any>).map((d) =>
            parseDate(d, props.valueFormat, lang.get())
          ) as [Dayjs, Dayjs];
        } else {
          dayOrDays = parseDate(
            props.modelValue!,
            props.valueFormat,
            lang.get()
          )!;
        }
      }

      if (pickerOptions.get().getRangeAvailableTime) {
        const availableResult = pickerOptions
          .get()
          .getRangeAvailableTime?.(dayOrDays!);
        if (!isEqual(availableResult, dayOrDays!)) {
          dayOrDays = availableResult!;

          // The result is corrected only when model-value exists
          if (!valueIsEmpty.get()) {
            emitInput(dayOrDaysToDate(dayOrDays));
          }
        }
      }
      if (isArray(dayOrDays!) && dayOrDays.some((day) => !day)) {
        dayOrDays = [] as unknown as DayOrDays;
      }
      return dayOrDays!;
    });

    const displayValue = computed<UserInput>(() => {
      if (!pickerOptions.get().panelReady) return '';
      const formattedValue = formatDayjsToString(parsedValue.get());
      if (isArray(userInput.get())) {
        return [
          userInput.get()?.[0] || (formattedValue && formattedValue[0]) || '',
          userInput.get()?.[1] || (formattedValue && formattedValue[1]) || '',
        ];
      } else if (userInput.get() !== undefined) {
        return userInput.get();
      }
      if (!isTimePicker.get() && valueIsEmpty.get()) return '';
      if (!pickerVisible.get() && valueIsEmpty.get()) return '';
      if (formattedValue) {
        return isDatesPicker.get() ||
          isMonthsPicker.get() ||
          isYearsPicker.get()
          ? (formattedValue as Array<string>).join(', ')
          : formattedValue;
      }
      return '';
    });

    const isTimeLikePicker = computed(() => props.type?.includes('time'));

    const isTimePicker = computed(() => props.type?.startsWith('time'));

    const isDatesPicker = computed(() => props.type === 'dates');

    const isMonthsPicker = computed(() => props.type === 'months');

    const isYearsPicker = computed(() => props.type === 'years');

    const triggerIcon = computed(
      () =>
        props.prefixIcon ||
        (isTimeLikePicker.get() ? ElClockSvg : ElCalendarSvg)
    );

    const showClose = signal(false);

    const onClearIconClick = (event: MouseEvent) => {
      if (props.readonly || pickerDisabled.get()) return;
      if (showClose.get()) {
        event.stopPropagation();
        // When the handleClear Function was provided, emit undefined will be executed inside it
        // There is no need for us to execute emit undefined twice. #14752
        if (pickerOptions.get().handleClear) {
          pickerOptions.get().handleClear?.();
        } else {
          emitInput(valueOnClear.get());
        }
        emitChange(valueOnClear.get(), true);
        showClose.set(false);
        onHide();
      }
      emit('clear');
    };

    const valueIsEmpty = computed(() => {
      const { modelValue } = props;
      return (
        !modelValue ||
        (isArray(modelValue) && !modelValue.filter(Boolean).length)
      );
    });

    const onMouseDownInput = async (event?: MouseEvent) => {
      if (props.readonly || pickerDisabled.get()) return;
      if (
        (event?.target as HTMLElement)?.tagName !== 'INPUT' ||
        isFocused.get()
      ) {
        pickerVisible.set(true);
      }
    };
    const onMouseEnter = () => {
      if (props.readonly || pickerDisabled.get()) return;
      if (!valueIsEmpty.get() && props.clearable) {
        showClose.set(true);
      }
    };
    const onMouseLeave = () => {
      showClose.set(false);
    };

    const onTouchStartInput = (event?: TouchEvent) => {
      if (props.readonly || pickerDisabled.get()) return;
      if (
        (event?.touches[0].target as HTMLElement)?.tagName !== 'INPUT' ||
        isFocused.get()
      ) {
        pickerVisible.set(true);
      }
    };

    const isRangeInput = computed(() => {
      return props.type?.includes('range');
    });

    const pickerSize = useFormSize();

    const popperEl = computed(
      () => unref(refPopper)?.popperRef?.get()?.contentRef
    ).get();

    const stophandle = onClickOutside(
      inputRef as Ref<TypeNode>,
      (e: PointerEvent) => {
        const unrefedPopperEl = unref(popperEl);
        const inputEl = unrefElement(inputRef as Ref<TypeNode>);
        if (
          (unrefedPopperEl &&
            (e.target === unrefedPopperEl ||
              e.composedPath().includes(unrefedPopperEl))) ||
          e.target === inputEl ||
          (inputEl && e.composedPath().includes(inputEl))
        )
          return;
        pickerVisible.set(false);
      }
    );

    onBeforeUnmount(() => {
      stophandle?.();
    });

    const userInput = signal<UserInput | undefined>(undefined);

    const handleChange = () => {
      if (userInput.get()) {
        const value = parseUserInputToDayjs(displayValue.get());
        if (value) {
          if (isValidValue(value)) {
            emitInput(dayOrDaysToDate(value));
            userInput.set(undefined);
          }
        }
      }
      if (userInput.get() === '') {
        emitInput(valueOnClear.get());
        emitChange(valueOnClear.get());
        userInput.set(undefined);
      }
    };

    const parseUserInputToDayjs = (value: UserInput) => {
      if (!value) return undefined;
      return pickerOptions.get().parseUserInput!(value);
    };

    const formatDayjsToString = (value: DayOrDays) => {
      if (!value) return undefined;
      return pickerOptions.get().formatToString!(value);
    };

    const isValidValue = (value: DayOrDays) => {
      return pickerOptions.get().isValidValue!(value);
    };

    const handleKeydownInput = async (event?: Event | KeyboardEvent) => {
      if (props.readonly || pickerDisabled.get()) return;

      const { code } = event as KeyboardEvent;
      emitKeydown(event as KeyboardEvent);
      if (code === EVENT_CODE.esc) {
        if (pickerVisible.get() === true) {
          pickerVisible.set(false);
          event?.preventDefault();
          event?.stopPropagation();
        }
        return;
      }

      if (code === EVENT_CODE.down) {
        if (pickerOptions.get().handleFocusPicker) {
          event?.preventDefault();
          event?.stopPropagation();
        }
        if (pickerVisible.get() === false) {
          pickerVisible.set(true);
          await nextTick();
        }
        if (pickerOptions.get().handleFocusPicker) {
          pickerOptions.get().handleFocusPicker?.();
          return;
        }
      }

      if (code === EVENT_CODE.tab) {
        hasJustTabExitedInput = true;
        return;
      }

      if (code === EVENT_CODE.enter || code === EVENT_CODE.numpadEnter) {
        if (
          userInput.get() === undefined ||
          userInput.get() === '' ||
          isValidValue(parseUserInputToDayjs(displayValue.get()) as DayOrDays)
        ) {
          handleChange();
          pickerVisible.set(false);
        }
        event?.stopPropagation();
        return;
      }

      // if user is typing, do not let picker handle key input
      if (userInput.get()) {
        event?.stopPropagation();
        return;
      }
      if (pickerOptions.get().handleKeydownInput) {
        pickerOptions.get().handleKeydownInput?.(event as KeyboardEvent);
      }
    };
    const onUserInput = (e?: Event) => {
      // userInput.set(e) // todo
      // Temporary fix when the picker is dismissed and the input box
      // is focused, just mimic the behavior of antdesign.
      if (!pickerVisible.get()) {
        pickerVisible.set(true);
      }
    };

    const handleStartInput = (event?: Event) => {
      const target = event?.target as HTMLInputElement;
      if (userInput.get()) {
        userInput.set([target.value, userInput?.get()?.[1]]);
      } else {
        userInput.set([target.value, undefined]);
      }
    };

    const handleEndInput = (event?: Event) => {
      const target = event?.target as HTMLInputElement;
      if (userInput.get()) {
        userInput.set([userInput.get()?.[0], target.value]);
      } else {
        userInput.set([undefined, target.value]);
      }
    };

    const handleStartChange = () => {
      const values = userInput.get() as string[];
      const value = parseUserInputToDayjs(values && values[0]) as Dayjs;
      const parsedVal = unref(parsedValue) as [Dayjs, Dayjs];
      if (value && value.isValid()) {
        userInput.set([
          formatDayjsToString(value) as string,
          displayValue.get()?.[1] || undefined,
        ]);
        const newValue = [
          value,
          parsedVal && (parsedVal[1] || undefined),
        ] as DayOrDays;
        if (isValidValue(newValue)) {
          emitInput(dayOrDaysToDate(newValue));
          userInput.set(undefined);
        }
      }
    };

    const handleEndChange = () => {
      const values = unref(userInput) as string[];
      const value = parseUserInputToDayjs(values && values[1]) as Dayjs;
      const parsedVal = unref(parsedValue) as [Dayjs, Dayjs];
      if (value && value.isValid()) {
        userInput.set([
          unref(displayValue)?.[0] || undefined,
          formatDayjsToString(value) as string,
        ]);
        const newValue = [parsedVal && parsedVal[0], value] as DayOrDays;
        if (isValidValue(newValue)) {
          emitInput(dayOrDaysToDate(newValue));
          userInput.set(undefined);
        }
      }
    };

    const pickerOptions = signal<Partial<PickerOptions>>({});

    const onSetPickerOption = <T extends keyof PickerOptions>(
      e: [T, PickerOptions[T]]
    ) => {
      pickerOptions.get()[e[0]] = e[1];
      pickerOptions.get().panelReady = true;
    };

    const onCalendarChange = (e: [Date, undefined | Date]) => {
      emit('calendar-change', e);
    };

    // @ts-ignore
    const onPanelChange = (
      value: [Dayjs, Dayjs],
      mode: 'month' | 'year',
      view: unknown
    ) => {
      emit('panel-change', value, mode, view);
    };

    const focus = () => {
      inputRef.get()?.dom?.focus();
    };

    const blur = () => {
      inputRef?.get()?.dom?.blur();
    };

    provide('EP_PICKER_BASE', {
      props,
    });

    defineExpose({
      /**
       * @description focus input box.
       */
      focus,
      /**
       * @description blur input box.
       */
      blur,
      /**
       * @description opens picker
       */
      handleOpen,
      /**
       * @description closes picker
       */
      handleClose,
      /**
       * @description pick item manually
       */
      onPick,
    });

    this.addChild(
      new TdTooltip({
        refEl: refPopper,
        visible: pickerVisible.get(),
        effect: 'light',
        pure: true,
        trigger: 'click',
        // v-bind: $attrs,
        role: 'dialog',
        teleported: true,
        transition: `${nsDate.namespace.get()}-zoom-in-top`,
        popperClass: [
          `${nsDate.namespace.get()}-picker__popper`,
          props.popperClass,
        ],
        popperOptions: tdPopperOptions,
        fallbackPlacements: props.fallbackPlacements,
        gpuAcceleration: false,
        placement: props.placement,
        stopPopperMouseEvent: false,
        hideAfter: 0,
        persistent: true,
        emits: {
          beforeShow: onBeforeShow,
          show: onShow,
          hide: onHide,
        },
        slots: {
          default: [
            new TdInput({
              vIf: !isRangeInput,
              id: props.id as string | undefined,
              refEl: inputRef,
              containerRole: 'combobox',
              modelValue: displayValue.get() as string,
              // name: name,
              size: pickerSize.get(),
              disabled: pickerDisabled.get(),
              placeholder: props.placeholder,
              class: [
                nsDate.b('editor'),
                nsDate.bm('editor', props.type) /* $attrs.class*/,
              ],
              // style: $attrs.style,
              readonly:
                !props.editable ||
                props.readonly ||
                isDatesPicker.get() ||
                isMonthsPicker.get() ||
                isYearsPicker.get() ||
                props.type === 'week',
              ariaLabel: props.ariaLabel,
              tabindex: props.tabindex,
              validateEvent: false,
              events: {
                input: onUserInput,
                focus: handleFocus,
                blur: handleBlur,
                keydown: handleKeydownInput,
                change: handleChange,
                mousedown: onMouseDownInput,
                mouseenter: onMouseEnter,
                mouseleave: onMouseLeave,
                touchstart: onTouchStartInput,
                click: (evt) => evt?.stopPropagation(),
              },
            }),
            new PickerRangeTrigger({}),
          ],
          content: [],
        },
      })
    );
  }
}
