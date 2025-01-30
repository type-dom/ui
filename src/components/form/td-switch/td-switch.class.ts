import {
  addUnit,
  debugWarn,
  isBoolean,
  isPromise,
  throwError,
} from '@type-dom/utils';
import {
  arraySlot,
  defineExpose,
  Div,
  Fragment,
  Input,
  ISlotRaw,
  nextTick,
  onMounted,
  Span,
  TypeDiv,
} from '@type-dom/framework';
import { Computed, computed, signal, unref, watch } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { ElLoadingSvg } from '@type-dom/svgs';
import {
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
  INPUT_EVENT,
} from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  useFormDisabled,
  useFormSize,
} from '../td-form/hooks/use-form-common-props';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import { ITdSwitch, SwitchProps, SwitchContext } from './td-switch.interface';
import { switchEmits, switchKey, switchProps } from './td-switch.const';
import './style/index';

export class TdSwitch extends TypeDiv implements ITdSwitch {
  className: 'TdSwitch';
  override props: SwitchProps;
  focus?: () => void;
  checked?: Computed<boolean>;

  constructor(params: SwitchProps = {}) {
    super();
    this.className = 'TdSwitch';
    this.attr.addName('td-switch');
    this.addEmits(switchEmits);
    this.assignProps(switchProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const COMPONENT_NAME = 'TdSwitch';
    const emit = this.emit;

    const { formItem } = useFormItem();
    const switchSize = useFormSize();
    const ns = useNamespace('switch');

    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem,
    });
    const switchDisabled = useFormDisabled(computed(() => props.loading));
    const isControlled = signal(props.modelValue !== false);
    const input = signal<HTMLInputElement>();
    const core = signal<HTMLSpanElement>();

    const switchKls = computed(() => [
      ns.b(),
      ns.m(switchSize.get()),
      ns.is('disabled', switchDisabled.get()),
      ns.is('checked', checked.get()),
    ]);

    const labelLeftKls = computed(() => [
      ns.e('label'),
      ns.em('label', 'left'),
      ns.is('active', !checked.get()),
    ]);

    const labelRightKls = computed(() => [
      ns.e('label'),
      ns.em('label', 'right'),
      ns.is('active', checked.get()),
    ]);

    const coreStyle = computed<IStyle>(() => ({
      width: addUnit(props.width),
      backgroundColor: checked.get()
        ? props.switchOnColor
        : props.switchOffColor,
    }));

    watch(
      () => props.vModel?.get(),
      () => {
        isControlled.set(true);
      }
    );

    const actualValue = computed(() => {
      return isControlled.get() ? props.vModel?.get() : false;
    });

    const checked = computed(() => actualValue.get() === props.activeValue);

    if (![props.activeValue, props.inactiveValue].includes(actualValue.get())) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue);
      emit(CHANGE_EVENT, props.inactiveValue);
      emit(INPUT_EVENT, props.inactiveValue);
    }

    watch(checked, (val) => {
      if (input.get()) {
        input.get()!.checked = val;
      }

      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => debugWarn(err));
      }
    });

    const handleChange = () => {
      const val = checked.get() ? props.inactiveValue : props.activeValue;
      emit(UPDATE_MODEL_EVENT, val);
      emit(CHANGE_EVENT, val);
      emit(INPUT_EVENT, val);
      nextTick(() => {
        input.get()!.checked = checked.get();
      });
    };

    const switchValue = () => {
      if (switchDisabled.get()) return;

      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }

      const shouldChange = beforeChange();

      const isPromiseOrBool = [
        isPromise(shouldChange),
        isBoolean(shouldChange),
      ].includes(true);
      if (!isPromiseOrBool) {
        throwError(
          COMPONENT_NAME,
          'beforeChange must return type `Promise<boolean>` or `boolean`'
        );
      }

      if (isPromise(shouldChange)) {
        shouldChange
          .then((result) => {
            if (result) {
              handleChange();
            }
          })
          .catch((e) => {
            debugWarn(COMPONENT_NAME, `some error occurred: ${e}`);
          });
      } else if (shouldChange) {
        handleChange();
      }
    };

    const focus = (): void => {
      input.get()?.focus?.();
    };

    onMounted(() => {
      input.get()!.checked = checked.get();
    });

    defineExpose({
      /**
       *  @description manual focus to the switch component
       **/
      focus,
      /**
       * @description whether Switch is checked
       */
      checked,
    });

    this.attr.addClass(switchKls);
    this.addEvents({
      click: (evt) => {
        switchValue();
        evt?.preventDefault();
      },
    });

    this.addChildren(
      new Input({
        refDom: input,
        attrObj: {
          id: inputId.get(),
          class: ns.e('input'),
          type: 'checkbox',
          role: 'switch',
          ariaChecked: checked,
          ariaDisabled: switchDisabled,
          ariaLabel: props.ariaLabel,
          // name: name,
          trueValue: props.activeValue,
          falseValue: props.inactiveValue,
          disabled: switchDisabled,
          tabindex: props.tabindex,
        },
        events: {
          change: handleChange,
          keydown: (evt) => {
            if (evt?.key === 'Enter') {
              switchValue();
            }
          },
        },
      }),
      !props.inlinePrompt && (props.inactiveIcon || props.inactiveText)
        ? new Span({
            class: labelLeftKls,
            slot: [
              props.inactiveIcon
                ? new TdIcon({
                    slot: props.inactiveIcon,
                  })
                : undefined,
              !props.inactiveIcon && props.inactiveText
                ? new Span({
                    attrObj: {
                      ariaHidden: checked,
                    },
                    slot: props.inactiveText,
                  })
                : undefined,
            ],
          })
        : undefined,
      new Span({
        refDom: core,
        class: ns.e('core'),
        styleObj: coreStyle,
        slot: [
          props.inlinePrompt
            ? new Div({
                class: ns.e('inner'),
                slot:
                  props.activeIcon || props.inactiveIcon
                    ? new TdIcon({
                        class: ns.is('icon'),
                        slot: computed(() =>
                          checked.get() ? props.activeIcon : props.inactiveIcon
                        ),
                      })
                    : props.activeText || props.inactiveText
                    ? new Span({
                        class: ns.is('text'),
                        // vIf: props.activeText || props.inactiveText,
                        attrObj: {
                          ariaHidden: !checked.get(),
                        },
                        slot: computed(() =>
                          checked.get() ? props.activeText : props.inactiveText
                        ),
                      })
                    : undefined,
              })
            : undefined,
          new Div({
            class: ns.e('action'),
            slot: computed(() => {
              if (props.loading) {
                return new TdIcon({
                  class: ns.is('loading'),
                  slot: new ElLoadingSvg(),
                });
              } else if (checked.get()) {
                if (props.slots?.activeAction) {
                  return props.slots.activeAction;
                } else {
                  if (props.activeActionIcon) {
                    return new TdIcon({
                      slot: props.activeActionIcon,
                    });
                  }
                }
              } else if (!checked.get()) {
                if (props.slots?.inactiveAction) {
                  return props.slots.inactiveAction;
                } else {
                  if (props.inactiveActionIcon) {
                    return new TdIcon({
                      slot: props.inactiveActionIcon,
                    });
                  }
                }
              }
              return undefined;
            }),
          }),
        ],
      }),
      !props.inlinePrompt && (props.activeIcon || props.activeText)
        ? new Span({
            class: labelRightKls,
            slot: (() => {
              const slot: ISlotRaw[] = [];
              if (props.activeIcon) {
                slot.push(
                  new TdIcon({
                    slot: props.activeIcon,
                  })
                );
              }
              if (!props.activeIcon && props.activeText) {
                slot.push(
                  new Span({
                    attrObj: {
                      ariaHidden: !checked.get(),
                    },
                    slot: props.activeText,
                  })
                );
              }
              return slot;
            })(),
          })
        : undefined
    );
  }
}
