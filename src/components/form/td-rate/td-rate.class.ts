import {
  defineExpose,
  Fragment,
  inject,
  Span,
  TypeDiv,
  TypeSvgSvg,
} from '@type-dom/framework';
import { ITdRate, RateProps } from './td-rate.interface';
import { rateEmits, rateProps } from './td-rate.const';
import {
  genNumArr,
  hasClass,
  isArray,
  isObject,
  isString,
} from '@type-dom/utils';
import { formContextKey, formItemContextKey } from '../td-form/td-form.const';
import { useFormSize } from '../td-form/hooks/use-form-common-props';
import { useFormItemInputId } from '../td-form/hooks/use-form-item';
import { useNamespace } from '../../../hooks/use-namespace';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { EVENT_CODE } from '../../../constants/aria';
import { computed, signal, unref, watch } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import './style/index';

export class TdRate extends TypeDiv implements ITdRate {
  className: 'TdRate';
  override props: RateProps;
  setCurrentValue?: (value: number, event?: MouseEvent) => void;
  resetCurrentValue?: () => void;

  constructor(params: RateProps = {}) {
    super();
    this.className = 'TdRate';

    this.addEmits(rateEmits);
    this.assignProps(rateProps);
    this.props = this.useParams(params);
  }

  override setup() {
    function getValueFromMap<T>(
      value: number,
      map?: Record<string, T | { excluded?: boolean; value: T }>
    ) {
      const isExcludedObject = (
        val: unknown
      ): val is { excluded?: boolean } & Record<any, unknown> => isObject(val);

      if (!map) {
        // add by me todo
        return;
      }
      const matchedKeys = Object.keys(map)
        .map((key) => +key)
        .filter((key) => {
          const val = map[key];
          const excluded = isExcludedObject(val) ? val.excluded : false;
          return excluded ? value < key : value <= key;
        })
        .sort((a, b) => a - b);
      const matchedValue = map[matchedKeys[0]];
      return (
        (isExcludedObject(matchedValue) && matchedValue.value) || matchedValue
      );
    }

    const props = this.props;
    const emit = this.emit;

    const formContext = inject(formContextKey, undefined);
    const formItemContext = inject(formItemContextKey, undefined);
    const rateSize = useFormSize();
    const ns = useNamespace('rate');
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext,
    });

    const currentValue = signal(props.modelValue!);
    const hoverIndex = signal(-1);
    const pointerAtLeftHalf = signal(true);

    const rateClasses = computed(() => [ns.b(), ns.m(rateSize.get())]);
    const rateDisabled = computed(
      () => props.disabled || unref(formContext?.disabled)
    );
    const rateStyles = computed(() => {
      return ns.cssVarBlock({
        'void-color': props.voidColor!,
        'disabled-void-color': props.disabledVoidColor!,
        'fill-color': activeColor.get()! as string, // todo 可能是对象
      }) as IStyle;
    });

    const text = computed(() => {
      let result = '';
      if (props.showScore) {
        result = props.scoreTemplate?.replace(
          /\{\s*value\s*\}/,
          rateDisabled.get() ? `${props.modelValue}` : `${currentValue.get()}`
        )!;
      } else if (props.showText) {
        result = props.texts?.[Math.ceil(currentValue.get()!) - 1]!;
      }
      return result;
    });
    const valueDecimal = computed(
      () => props.modelValue! * 100 - Math.floor(props.modelValue!) * 100
    );
    const colorMap = computed(() => {
      const colors = unref(props.colors);
      return isArray(colors)
        ? {
            [props.lowThreshold!]: colors[0],
            [props.highThreshold!]: { value: colors[1], excluded: true },
            [props.max!]: colors[2],
          }
        : colors;
    });
    const activeColor = computed(() => {
      // console.warn('colorMap is ', colorMap);
      const color = getValueFromMap(currentValue.get(), colorMap.get()!);
      // {value: '', excluded: true} returned
      return isObject(color) ? '' : color;
    });
    const decimalStyle = computed(() => {
      let width = '';
      if (rateDisabled.get()) {
        width = `${valueDecimal.get()}%`;
      } else if (props.allowHalf) {
        width = '50%';
      }
      return {
        color: activeColor.get(),
        width,
      };
    });
    const componentMap = computed(() => {
      // console.warn('componentMap is ');
      const icons = isArray(props.icons) ? [...props.icons] : { ...props.icons };
      // icons = markRaw(icons) as
      //   | Array<string | typeof TypeSvgSvg>
      //   | Record<number, string | typeof TypeSvgSvg>
      return isArray(icons)
        ? {
            [props.lowThreshold!]: icons[0],
            [props.highThreshold!]: {
              value: icons[1],
              excluded: true,
            },
            [props.max!]: icons[2],
          }
        : icons;
    });
    const decimalIconComponent = computed(() => {
      // console.warn('decimalIconComponent is ', componentMap);
      return getValueFromMap(props.modelValue!, componentMap.get());
    });
    const voidComponent = computed(
      () =>
        rateDisabled.get()
          ? props.disabledVoidIcon
          : // : ((props.disabledVoidIcon) as typeof TypeSvgSvg)
            props.voidIcon
      // : ((props.voidIcon) as typeof TypeSvgSvg)
      // rateDisabled.value
      //   ? isString(props.disabledVoidIcon)
      //     ? props.disabledVoidIcon
      //     : (markRaw(props.disabledVoidIcon) as Component)
      //   : isString(props.voidIcon)
      //     ? props.voidIcon
      //     : (markRaw(props.voidIcon) as Component)
    );
    const activeComponent = computed(() =>
      getValueFromMap(currentValue.get(), componentMap.get())
    );

    function showDecimalIcon(item: number) {
      const showWhenDisabled =
        rateDisabled.get() &&
        valueDecimal.get() > 0 &&
        item - 1 < props.modelValue! &&
        item > props.modelValue!;
      const showWhenAllowHalf =
        props.allowHalf &&
        pointerAtLeftHalf.get() &&
        item - 0.5 <= currentValue.get() &&
        item > currentValue.get();
      return showWhenDisabled || showWhenAllowHalf;
    }

    function emitValue(value: number) {
      // if allow clear, and selected value is same as modelValue, reset value to 0
      if (props.clearable && value === props.modelValue) {
        value = 0;
      }

      emit(UPDATE_MODEL_EVENT, value);
      if (props.modelValue !== value) {
        emit('change', value);
      }
    }

    function selectValue(value: number) {
      if (rateDisabled.get()) {
        return;
      }
      if (props.allowHalf && pointerAtLeftHalf.get()) {
        emitValue(currentValue.get());
      } else {
        emitValue(value);
      }
    }

    function handleKey(e?: KeyboardEvent) {
      if (rateDisabled.get()) {
        return;
      }
      let _currentValue = currentValue.get();
      const code = e?.code;
      if (code === EVENT_CODE.up || code === EVENT_CODE.right) {
        if (props.allowHalf) {
          _currentValue += 0.5;
        } else {
          _currentValue += 1;
        }
        e?.stopPropagation();
        e?.preventDefault();
      } else if (code === EVENT_CODE.left || code === EVENT_CODE.down) {
        if (props.allowHalf) {
          _currentValue -= 0.5;
        } else {
          _currentValue -= 1;
        }
        e?.stopPropagation();
        e?.preventDefault();
      }
      _currentValue = _currentValue < 0 ? 0 : _currentValue;
      _currentValue = _currentValue > props.max! ? props.max! : _currentValue!;
      emit(UPDATE_MODEL_EVENT, _currentValue);
      emit('change', _currentValue);
      return _currentValue;
    }

    function setCurrentValue(value: number, event?: MouseEvent) {
      if (rateDisabled.get()) {
        return;
      }
      if (props.allowHalf && event) {
        // TODO: use cache via computed https://github.com/element-plus/element-plus/pull/5456#discussion_r786472092
        let target = event.target as HTMLElement;
        if (hasClass(target, ns.e('item'))) {
          target = target.querySelector(`.${ns.e('icon')}`)!;
        }
        if (target.clientWidth === 0 || hasClass(target, ns.e('decimal'))) {
          target = target.parentNode as HTMLElement;
        }
        pointerAtLeftHalf.set(event.offsetX * 2 <= target.clientWidth);
        currentValue.set(pointerAtLeftHalf.get() ? value - 0.5 : value);
      } else {
        currentValue.set(value);
      }
      hoverIndex.set(value);
    }

    function resetCurrentValue() {
      if (rateDisabled.get()) {
        return;
      }
      if (props.allowHalf) {
        pointerAtLeftHalf.set(
          props.modelValue !== Math.floor(props.modelValue!)
        );
      }
      currentValue.set(props.modelValue!);
      hoverIndex.set(-1);
    }

    watch(props.vModel, (val: number) => {
      currentValue.set(val);
      pointerAtLeftHalf.set(props.modelValue !== Math.floor(props.modelValue!));
    });

    if (!props.modelValue) {
      emit(UPDATE_MODEL_EVENT, 0);
    }

    defineExpose({
      /** @description set current value */
      setCurrentValue,
      /** @description reset current value */
      resetCurrentValue,
    });

    this.attr.addObj({
      id: inputId.get(),
      class: computed(() => [
        rateClasses.get(),
        ns.is('disabled', unref(rateDisabled)),
      ]),
      role: 'slider',
      ariaLabel: !isLabeledByFormItem.get()
        ? props.ariaLabel || 'rating'
        : undefined,
      ariaLabelledby: isLabeledByFormItem.get()
        ? formItemContext?.labelId
        : undefined,
      ariaValuenow: currentValue.get(),
      ariaValuetext: text.get() || undefined,
      ariaValuemin: 0,
      ariaValuemax: props.max,
      tabindex: 0,
    });
    this.style.addObj(rateStyles);
    this.addEvents({
      keydown: handleKey,
    });

    genNumArr(props.max).forEach((item) => {
      this.addChild(
        new Span({
          class: ns.e('item'),
          events: {
            mousemove: (evt) => setCurrentValue(item, evt),
            mouseleave: resetCurrentValue,
            click: () => selectValue(item),
          },
          slot: new TdIcon({
            class: computed(() => [
              ns.e('icon'),
              { hover: hoverIndex.get() === item },
              ns.is('active', item <= currentValue.get()),
            ]),
            slot: computed(() => {
              if (!showDecimalIcon(item)) {
                return [
                  activeComponent.get() &&
                    new (activeComponent.get() as any)({
                      vShow: item <= currentValue.get(),
                    }),
                  new (voidComponent.get() as any)({
                    vShow: !(item <= currentValue.get()),
                  }),
                ];
              } else {
                return [
                  new (voidComponent.get() as any)({
                    class: [ns.em('decimal', 'box')],
                  }),
                  new TdIcon({
                    styleObj: decimalStyle,
                    class: [ns.e('icon'), ns.e('decimal')],
                    slot:
                      decimalIconComponent.get() &&
                      new (decimalIconComponent.get() as any)(),
                  }),
                ];
              }
            }),
            // slot: !showDecimalIcon(item)
            // ? [
            //     new (activeComponent.get() as any)({
            //       vShow: computed(() => item <= currentValue.get()),
            //     }),
            //     new (voidComponent.get() as any)({
            //       vShow: computed(() => !(item <= currentValue.get())),
            //     }),
            //   ]
            // : [
            //     new (voidComponent.get() as any)({
            //       class: [ns.em('decimal', 'box')],
            //     }),
            //     new TdIcon({
            //       styleObj: decimalStyle,
            //       class: [ns.e('icon'), ns.e('decimal')],
            //       slot: new (decimalIconComponent.get() as any)(),
            //     })
            //   ]
          }),
        })
      );
    });

    if (props.showText || props.showScore) {
      this.addChild(
        new Span({
          class: ns.e('text'),
          styleObj: { color: props.textColor },
          slot: text,
        })
      );
    }
  }
}
