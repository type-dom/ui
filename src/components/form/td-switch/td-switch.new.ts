import {
  addUnit,
  debugWarn,
  isBoolean,
  isPromise,
  throwError,
} from '@type-dom/utils';
import { Input, nextTick, onMounted, TypeDiv } from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import {
  CHANGE_EVENT,
  UPDATE_MODEL_EVENT,
  INPUT_EVENT,
} from '../../../constants/event';
import { TdSwitchCore } from './widget/td-switch-core';
import { TdSwitchLeft } from './widget/td-switch-left';
import { TdSwitchRight } from './widget/td-switch-right';
import { ITdSwitch, SwitchProps, SwitchContext } from './td-switch.interface';
import {
  $switchCoreHeight,
  $switchFontSize,
  $switchHeight,
} from './td-switch.style';
import { switchEmits, switchKey, switchProps } from './td-switch.const';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import {
  useFormDisabled,
  useFormSize,
} from '../td-form/hooks/use-form-common-props';

export class TdSwitch extends TypeDiv implements ITdSwitch {
  className: 'TdSwitch';
  override props: SwitchProps;
  input: Input;
  private left?: TdSwitchLeft;
  private core: TdSwitchCore;
  private right?: TdSwitchRight;
  private activeValue?: boolean | string | number;
  private focus?: () => void;

  constructor(params: SwitchProps = {}) {
    super();
    this.className = 'TdSwitch';
    this.style.addObj({
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      // fontSize: $switchFontSize[params?.size || 'default'],
      // lineHeight: $switchCoreHeight[params?.size || 'default'],
      // height: $switchHeight[params?.size || 'default']
    });
    this.assignProps(switchProps);
    this.addEmits(switchEmits);
    this.props = this.useParams(params);

    this.input = new Input({
      attrObj: {
        type: 'checkbox',
        role: 'switch',
      },
      styleObj: {
        display: 'none',
      },
    });
    this.addChild(this.input);
    if (
      !params?.inlinePrompt &&
      (params?.inactiveIcon || params?.inactiveText)
    ) {
      this.left = new TdSwitchLeft(params);
      this.addChild(this.left);
    }
    this.core = new TdSwitchCore(
      Object.assign({}, params, {
        modelValue: this.props.modelValue,
        activeValue: this.activeValue,
        // inactiveValue: this.inactiveValue
      })
    );
    this.addChild(this.core);
    if (!params?.inlinePrompt && (params?.activeIcon || params?.activeText)) {
      console.log('td-switch right .');
      this.right = new TdSwitchRight(params);
      this.addChild(this.right);
    }
  }

  override setup() {
    const props = this.props;
    const COMPONENT_NAME = 'TdSwitch';
    const { formItem } = useFormItem();
    const switchSize = useFormSize();

    watch(
      () => switchSize.get(),
      (size) => {
        console.warn('watch size , size is ', size);
        this.style.addObj({
          fontSize: $switchFontSize[size || 'default'],
          lineHeight: $switchCoreHeight[size || 'default'],
          height: $switchHeight[size || 'default'],
        });
      }
    );
    // this.setSize()
    // const ns = useNamespace('switch')

    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem,
    });

    const switchDisabled = useFormDisabled(
      computed(() => props.loading || false)
    );

    const isControlled = signal(props?.modelValue !== false);
    const input = signal<HTMLInputElement>();
    const core = signal<HTMLSpanElement>();

    const coreStyle = computed<IStyle>(() => ({
      width: addUnit(props.width),
    }));

    watch(
      () => props.modelValue,
      () => {
        isControlled.set(true);
      }
    );

    const actualValue = computed(() => {
      return isControlled.get() ? props.modelValue : false;
    });

    const checked = computed(() => actualValue.get() === props.activeValue);
    this.core.assignProps({
      refDom: core,
      checked: checked,
      styleObj: coreStyle,
    });

    if (
      ![props?.activeValue, props?.inactiveValue].includes(actualValue.get())
    ) {
      this.emit(UPDATE_MODEL_EVENT, props?.inactiveValue);
      this.emit(CHANGE_EVENT, props?.inactiveValue);
      this.emit(INPUT_EVENT, props?.inactiveValue);
    }

    watch(
      () => checked.get(),
      (val) => {
        console.warn('checked changed', val);
        input.get()!.checked = val;

        if (props.validateEvent) {
          formItem?.validate?.('change').catch((err) => debugWarn(err));
        }
        //   todo setChecked;
      }
    );

    const handleChange = () => {
      const val = checked.get() ? props.inactiveValue : props.activeValue;
      this.emit(UPDATE_MODEL_EVENT, val);
      this.emit(CHANGE_EVENT, val);
      this.emit(INPUT_EVENT, val);
      nextTick(() => {
        input.get()!.checked = checked.get();
      });
    };

    const switchValue = () => {
      if (switchDisabled.get()) {
        return;
      }

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

    this.addEvents({
      click: (evt) => {
        evt?.preventDefault();
        switchValue();
      },
    });
    this.input.assignProps({
      refDom: input,
      id: inputId,
      ariaChecked: checked,
      ariaDisabled: switchDisabled,
      ariaLabel: props.ariaLabel,
      name: props.name,
      trueValue: props.activeValue,
      falseValue: props.inactiveValue,
      disabled: switchDisabled,
      tabindex: props.tabindex,
      events: {
        change: handleChange,
        keydown: (evt) => {
          if (evt?.key === 'Enter') {
            switchValue();
          }
        },
      },
    });

    this.focus = (): void => {
      input.get()?.focus?.();
    };

    onMounted(() => {
      input.get()!.checked = checked.get();
    });

    this.provide<SwitchContext>(switchKey, {
      checked: checked,
    });
  }
}
