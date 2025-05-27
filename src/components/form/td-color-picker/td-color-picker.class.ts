import {
  defineExpose,
  Div,
  nextTick,
  onMounted,
  provide,
  Span,
  TypeFragment,
} from '@type-dom/framework';
import { computed, signal, unref, watch } from '@type-dom/signals';
import { debugWarn } from '@type-dom/utils';
import { ElArrowDownSvg, ElCloseSvg } from '@type-dom/svgs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { debounce } from 'lodash-es';

import { useLocale } from '../../../hooks/use-locale';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdTooltip } from '../../../components/feedback/td-tooltip/td-tooltip.class';
import { useFocusController } from '../../../hooks/use-focus-controller';
import {
  CHANGE_EVENT,
  EVENT_CODE,
  UPDATE_MODEL_EVENT,
} from '../../../constants';
import { TdButton, TdIcon } from '../../basic';
import { TdInput } from '../td-input/td-input.class';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import {
  useFormDisabled,
  useFormSize,
} from '../td-form/hooks/use-form-common-props';
import { ColorPickerProps, ITdColorPicker } from './td-color-picker.interface';
import {
  colorPickerContextKey,
  colorPickerEmits,
  colorPickerProps,
} from './td-color-picker.const';
import './style/index';
import { TdColorHueSlider } from './components/hue-slider';
import { TdColorAlphaSlider } from './components/alpha-slider';
import { SvPanel } from './components/sv-panel';
import Color from './utils/color';
import { Predefine } from './components/predefine';
import './style/index';

export class TdColorPicker extends TypeFragment implements ITdColorPicker {
  className: 'TdColorPicker';
  override props: ColorPickerProps;

  constructor(params: ColorPickerProps) {
    super();
    this.className = 'TdColorPicker';
    this.addEmits(colorPickerEmits);
    this.assignProps(colorPickerProps);
    this.props = this.useParams(params);
  }
  override setup() {
    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale();
    const ns = useNamespace('color');
    const { formItem } = useFormItem();
    const colorSize = useFormSize();
    const colorDisabled = useFormDisabled();

    const { inputId: buttonId, isLabeledByFormItem } = useFormItemInputId(
      props,
      {
        formItemContext: formItem,
      }
    );

    const hue = signal<TdColorHueSlider>();
    const sv = signal<SvPanel>();
    const alpha = signal<TdColorAlphaSlider>();
    const popper = signal<TdTooltip>();
    const triggerRef = signal<HTMLElement>();
    const inputRef = signal<TdInput>();

    const { isFocused, handleFocus, handleBlur } = useFocusController(
      triggerRef,
      {
        beforeFocus() {
          return colorDisabled.get();
        },
        beforeBlur(event) {
          return popper.get()?.isFocusInsideContent?.(event);
        },
        afterBlur() {
          setShowPicker(false);
          resetColor();
        },
      }
    );

    // active-change is used to prevent modelValue changes from triggering.
    let shouldActiveChange = true;

    const color = new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || '',
      value: props.vModel?.get(),
    });

    const showPicker = signal(false);
    const showPanelColor = signal(false);
    const customInput = signal('');

    const displayedColor = computed(() => {
      if (!props.vModel?.get() && !showPanelColor.get()) {
        return 'transparent';
      }
      return displayedRgb(color, props.showAlpha!);
    });

    const currentColor = computed(() => {
      return !props.vModel?.get() && !showPanelColor.get() ? '' : color.value.get();
    });

    const buttonAriaLabel = computed<string | undefined>(() => {
      return !isLabeledByFormItem.get()
        ? unref(props.ariaLabel) || t('el.colorpicker.defaultLabel')
        : undefined;
    });

    const buttonAriaLabelledby = computed<string | undefined>(() => {
      return isLabeledByFormItem.get() ? formItem?.labelId : undefined;
    });

    const btnKls = computed(() => {
      return [
        ns.b('picker'),
        ns.is('disabled', colorDisabled.get()),
        ns.bm('picker', colorSize.get()),
        ns.is('focused', isFocused.get()),
      ];
    });

    function displayedRgb(color: Color, showAlpha?: boolean) {
      if (!(color instanceof Color)) {
        throw new TypeError('color should be instance of _color Class');
      }

      const { r, g, b } = color.toRgb();
      return showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') as number / 100})`
        : `rgb(${r}, ${g}, ${b})`;
    }

    function setShowPicker(value: boolean) {
      showPicker.set(value);
    }

    const debounceSetShowPicker = debounce(setShowPicker, 100, {
      leading: true,
    });
    function show() {
      if (colorDisabled.get()) return;
      setShowPicker(true);
    }

    function hide() {
      debounceSetShowPicker(false);
      resetColor();
    }

    function resetColor() {
      nextTick(() => {
        if (props.vModel?.get()) {
          color.fromString(props.vModel?.get());
        } else {
          color.value.set('');
          if (!currentColor.get() && customInput.get()) {
            customInput.set('');
          }
          nextTick(() => {
            showPanelColor.set(false);
          });
        }
      });
    }

    function handleTrigger() {
      if (colorDisabled.get()) return;
      if (showPicker.get()) {
        resetColor();
      }
      debounceSetShowPicker(!showPicker.get());
    }

    function handleConfirm() {
      // console.warn('handleConfirm . ');
      color.fromString(customInput.get());
    }

    function confirmValue() {
      const value = color.value.get();
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
      if (props.validateEvent) {
        formItem?.validate('change').catch((err) => debugWarn(err));
      }
      debounceSetShowPicker(false);
      // check if modelValue change, if not change, then reset color.
      nextTick(() => {
        const newColor = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat || '',
          value: props.vModel?.get(),
        });
        if (!color.compare(newColor)) {
          resetColor();
        }
      });
    }

    function clear() {
      // console.warn('clear . ');
      debounceSetShowPicker(false);
      emit(UPDATE_MODEL_EVENT, null);
      emit(CHANGE_EVENT, null);
      if (props.vModel?.get() !== null && props.validateEvent) {
        formItem?.validate('change').catch((err) => debugWarn(err));
      }
      resetColor();
    }

    // function handleClickOutside() {
    //   if (!showPicker.get()) return;
    //   hide();
    //   if (isFocused.get()) focus();
    // }

    function handleEsc(event: KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();
      setShowPicker(false);
      resetColor();
    }

    function handleKeyDown(event?: KeyboardEvent) {
      switch (event?.code) {
        case EVENT_CODE.enter:
        case EVENT_CODE.numpadEnter:
        case EVENT_CODE.space:
          event.preventDefault();
          event.stopPropagation();
          show();
          inputRef.get().focus?.();
          break;
        case EVENT_CODE.esc:
          handleEsc(event);
          break;
      }
    }

    function focus() {
      triggerRef.get().focus();
    }

    function blur() {
      triggerRef.get().blur();
    }

    onMounted(() => {
      if (props.vModel?.get()) {
        customInput.set(currentColor.get());
      }
    });

    watch(
      () => props.vModel?.get(),
      (newVal) => {
        if (!newVal) {
          showPanelColor.set(false);
        } else if (newVal && newVal !== color.value.get()) {
          shouldActiveChange = false;
          color.fromString(newVal);
        }
      }
    );

    watch(
      () => [props.colorFormat, props.showAlpha],
      () => {
        // console.warn('watch [props.colorFormat, props.showAlpha]');
        color.enableAlpha.set(!!props.showAlpha);
        color.format.set(props.colorFormat || color.format.get());
        color.doOnChange();
        emit(UPDATE_MODEL_EVENT, color.value.get());
      }
    );

    watch(
      () => currentColor.get(),
      (val) => {
        // console.warn('watch currentColor.get(), val is ', val);
        customInput.set(val);
        if (shouldActiveChange) emit('activeChange', val);
        shouldActiveChange = true;
      }
    );

    watch(
      () => color.value.get(),
      () => {
        if (!props.vModel?.get() && !showPanelColor.get()) {
          showPanelColor.set(true);
        }
      }
    );

    watch(
      () => showPicker.get(),
      () => {
        nextTick(() => {
          hue.get()?.update?.();
          sv.get()?.update?.();
          alpha.get()?.update?.();
        });
      }
    );

    provide(colorPickerContextKey, {
      currentColor,
    });

    defineExpose({
      /**
       * @description current color object
       */
      color,
      /**
       * @description manually show ColorPicker
       */
      show,
      /**
       * @description manually hide ColorPicker
       */
      hide,
      /**
       * @description focus the input element
       */
      focus,
      /**
       * @description blur the input element
       */
      blur,
    });

    this.addChild(new TdTooltip({
      refEl: popper,
      visible: showPicker,
      showArrow: false,
      fallbackPlacements: ['bottom', 'top', 'right', 'left'],
      offset: 0,
      gpuAcceleration: false,
      popperClass: [ns.be('picker', 'panel'), ns.b('dropdown'), props.popperClass],
      stopPopperMouseEvent: false,
      effect: 'light',
      trigger: 'click',
      teleported: props.teleported,
      transition: `${ns.namespace.get()}-zoom-in-top`,
      persistent: true,
      emits: {
        hide: () => setShowPicker(false),
      },
      slots: {
        content: new Div({
          // clickoutside: handleClickOutside,
          events: {
            keydown: (event?: KeyboardEvent) => {
              if (event?.code === EVENT_CODE.esc) {
                handleEsc(event);
              }
            }
          },
          slot: [
            new Div({
              class: ns.be('dropdown', 'main-wrapper'),
              slot: [
                new TdColorHueSlider({
                  refEl: hue,
                  class: 'hue-slider',
                  color: color,
                  vertical: true,
                }),
                new SvPanel({
                  refEl: sv,
                  color: color,
                })
              ]
            }),
            new TdColorAlphaSlider({
              vIf: props.showAlpha,
              refEl: alpha,
              color: color,
            }),
            new Predefine({
              vIf: props.predefine,
              // ref: 'predefine',
              enableAlpha: props.showAlpha,
              color: color,
              colors: props.predefine,
            }),
            new Div({
              class: ns.be('dropdown', 'btns'),
              slot: [
                new Span({
                  class: ns.be('dropdown', 'value'),
                  slot: new TdInput({
                    refEl: inputRef,
                    vModel: customInput,
                    validateEvent: false,
                    size: 'small',
                    emits: {
                      keyup: (event?: KeyboardEvent) => {
                        if (event?.code === EVENT_CODE.enter) {
                          handleConfirm();
                        }
                      },
                      blur: handleConfirm,
                    }
                  })
                }),
                new TdButton({
                  class: ns.be('dropdown', 'link-btn'),
                  text: true,
                  size: 'small',
                  emits: {
                    click: clear
                  },
                  slot: t('el.colorpicker.clear')
                }),
                new TdButton({
                  plain: true,
                  size: 'small',
                  class: ns.be('dropdown', 'btn'),
                  emits: {
                    click: confirmValue
                  },
                  slot: t('el.colorpicker.confirm')
                })
              ]
            })
          ]
        })
      },
      slot: new Div({
        refDom: triggerRef,
        // vbind: $attrs
        class: btnKls,
        attrObj: {
          id: buttonId,
          role: 'button',
          ariaLabel: buttonAriaLabel,
          ariaLabelledby: buttonAriaLabelledby,
          ariaDescription: t('el.colorpicker.description', { color: props.vModel?.get() || '' }),
          ariaDisabled: colorDisabled,
          tabindex: colorDisabled.get() ? undefined : props.tabindex,
        },
        events: {
          keydown: handleKeyDown,
          focus: handleFocus,
          blur: handleBlur
        },
        slot: [
          new Div({
            vIf: colorDisabled,
            class: ns.be('picker', 'mask'),
          }),
          new Div({
            class: ns.be('picker', 'trigger'),
            events: {
              click: handleTrigger,
            },
            slot: [
              new Span({
                class: [ns.be('picker', 'color'), ns.is('alpha', props.showAlpha)],
                slot: [
                  new Span({
                    class: ns.be('picker', 'color-inner'),
                    styleObj: {
                      backgroundColor: displayedColor,
                    },
                    slot: [
                      new TdIcon({
                        vShow: props.vModel || showPanelColor,
                        class: [ns.be('picker', 'icon'), ns.is('icon-arrow-down')],
                        slot: new ElArrowDownSvg(),
                      }),
                      new TdIcon({
                        vShow: computed(() => !props.vModel?.get() && !showPanelColor.get()),
                        class: [ns.be('picker', 'empty'), ns.is('icon-close')],
                        slot: new ElCloseSvg(),
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    }))
  }
}