import { isBoolean, isPromise } from '@type-dom/utils';
import { Input, nextTick } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $colors } from '../../../styles/var';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, INPUT_EVENT } from '../../../constants/event';
import { TdSwitchCore } from './widget/td-switch-core';
import { TdSwitchLeft } from './widget/td-switch-left';
import { TdSwitchRight } from './widget/td-switch-right';
import { ITdSwitch, ITdSwitchConfig } from './td-switch.interface';
import {
  $switchButtonSize,
  $switchCoreHeight,
  $switchFontSize,
  $switchHeight,
  $switchOffColor,
  $switchOnColor
} from './td-switch.style';

export class TdSwitch extends UI implements ITdSwitch {
  className: 'TdSwitch';
  override props: ITdSwitchConfig;
  input: Input;
  private left?: TdSwitchLeft;
  private core: TdSwitchCore;
  private right?: TdSwitchRight;
  private activeValue?: boolean | string | number;
  private inactiveValue: boolean | string | number;
  private isControlled: boolean;

  constructor(params: ITdSwitchConfig = {}) {
    super();
    this.className = 'TdSwitch';
    this.style.addObj({
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      fontSize: $switchFontSize[params?.size || 'default'],
      lineHeight: $switchCoreHeight[params?.size || 'default'],
      height: $switchHeight[params?.size || 'default']
    });
    this.isControlled = params?.modelValue !== false;
    this.modelValue = params?.modelValue ?? false;
    this.activeValue = params?.activeValue ?? true;
    this.inactiveValue = params?.inactiveValue ?? false;
    if (![params?.activeValue, params?.inactiveValue].includes(this.actualValue)) {
      // emit(UPDATE_MODEL_EVENT, params?.inactiveValue)
      params?.emits?.[UPDATE_MODEL_EVENT]?.(params?.inactiveValue);
      // emit(CHANGE_EVENT, params?.inactiveValue)
      params?.emits?.[CHANGE_EVENT]?.(params?.inactiveValue);
      // emit(INPUT_EVENT, params?.inactiveValue)
      params?.emits?.[INPUT_EVENT]?.(params?.inactiveValue);
    }
    this.input = new Input({
      attrObj: {
        type: 'checkbox',
        role: 'switch'
      },
      styleObj: {
        display: 'none'
      }
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
        modelValue: this.modelValue,
        activeValue: this.activeValue,
        inactiveValue: this.inactiveValue
      })
    );
    this.addChild(this.core);
    if (!params?.inlinePrompt && (params?.activeIcon || params?.activeText)) {
      console.log('td-switch right .');
      this.right = new TdSwitchRight(params);
      this.addChild(this.right);
    }
    this.props = this.useParams(params);
  }

  get actualValue() {
    return this.isControlled ? this.props.modelValue : false
  }

  get checked() {
    return this.actualValue === this.props.activeValue;
  }

  override mounted() {
    const props = this.props;
    this.setChecked(this.modelValue === this.activeValue);
    if (props?.disabled) {
      this.setDisabled(props.disabled);
    }
    if (props.loading) {
      this.setLoading(props.loading);
    }
  }

  override setup() {
    this.addEvents({
      click: (evt) => {
        // changeValue
        evt?.preventDefault();
        this.switchValue();
      }
    });
  }

  handleChange() {
    console.log('handleChange . ');
    const props = this.props;
    const checked = this.modelValue === this.activeValue;
    // this.modelValue = !this.modelValue;
    this.modelValue = checked ? this.inactiveValue : this.activeValue;
    const val = checked ? this.inactiveValue : this.activeValue;
    this.emit(UPDATE_MODEL_EVENT, val)
    // this.props.emits?.[UPDATE_MODEL_EVENT]?.(val);
    this.emit(CHANGE_EVENT, val)
    // this.props.emits?.[CHANGE_EVENT]?.(val);
    this.emit(INPUT_EVENT, val)
    // this.props.emits?.[INPUT_EVENT]?.(val);
    nextTick(() => {
      this.input.dom.checked = !checked;
      console.log('handleChange . this.input.dom.checked is ', checked);
      // this.input.setValue(val);
      this.setChecked(!checked);
    });
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.style.setObj({
        opacity: 0.6
      });
      this.input.attr.setObj({
        disabled: true,
        ariaDisabled: true
      });
      this.left?.style.setObj({
        cursor: 'not-allowed'
      });
      this.core.style.setObj({
        cursor: 'not-allowed'
      });
    } else {
      this.style.setObj({
        opacity: 1
      });
      this.input.attr.setObj({
        disabled: false,
        ariaDisabled: false
      });
      this.left?.style.setObj({
        cursor: 'auto'
      });
      this.core.style.setObj({
        cursor: 'auto'
      });
    }
  }

  // setStyleObj 应该在渲染后执行。
  setChecked(checked: boolean) {
    if (checked) {
      this.core.style.setObj({
        backgroundColor: this.props.switchOnColor ?? $switchOnColor
      });
      this.core.action.style.setObj({
        color: $switchOnColor,
        // left: calc(100% - #{map.get($switch-button-size, 'default') + 1px});
        left:
          'calc(100% - ' +
          $switchButtonSize[this.props.size || 'default'] +
          ' - 1px)'
      });
      if (this.right) {
        this.right.style.setObj({
          color: $colors.primary.base
        });
      }
      if (this.left) {
        this.left.style.setObj({
          color: $colors.default.base
        });
      }
      if (this.props.inlinePrompt) {
        this.core.setInnerChecked(true);
      }
      if (this.props.activeActionIcon) {
        this.core.actionIcon?.replaceSvg(this.props.activeActionIcon);
      } else if (this.props.activeActionText) {
        this.core.actionSpan?.textNode?.setText(this.props.activeActionText);
      }
    } else {
      this.core.style.setObj({
        backgroundColor: this.props.switchOffColor ?? $switchOffColor
      });
      this.core.action.style.setObj({
        left: '1px',
        color: $switchOffColor
      });
      if (this.left) {
        this.left.style.setObj({
          color: $colors.primary.base
        });
      }
      if (this.right) {
        this.right.style.setObj({
          color: $colors.default.base
        });
      }
      if (this.props.inlinePrompt) {
        this.core.setInnerChecked(false);
      }
      if (this.props.inactiveActionIcon) {
        this.core.actionIcon?.replaceSvg(this.props.inactiveActionIcon);
      } else if (this.props.inactiveActionText) {
        this.core.actionSpan?.textNode?.setText(this.props.inactiveActionText);
      }
    }
  }

  setLoading(loading: boolean) {
    if (loading) {
      this.setDisabled(true)
    }
  }
  switchValue() {
    console.log('switchValue . ');
    const props = this.props;

    if (props?.loading || props?.disabled) {
      return;
    }
    const beforeChange = props?.beforeChange;
    if (!beforeChange) {
      this.handleChange();
      return;
    }

    const shouldChange = beforeChange();

    const isPromiseOrBool = [
      isPromise(shouldChange),
      isBoolean(shouldChange)
    ].includes(true);
    if (!isPromiseOrBool) {
      // throwError(
      //   COMPONENT_NAME,
      //   'beforeChange must return type `Promise<boolean>` or `boolean`'
      // )
      console.error(
        'beforeChange must return type `Promise<boolean>` or `boolean`'
      );
    }

    if (isPromise(shouldChange)) {
      shouldChange
        .then((result) => {
          if (result) {
            this.handleChange();
          }
        })
        .catch((e) => {
          // debugWarn(COMPONENT_NAME, `some error occurred: ${e}`)
          console.error(`some error occurred: ${e}`);
        });
    } else if (shouldChange) {
      this.handleChange();
    }
  }
}
