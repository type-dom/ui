import { isBoolean, isPromise } from '@type-dom/utils';
import { Input, nextTick, StyleCursor } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $colors } from '../../../styles/var';
import { ITdSwitch, ITdSwitchConfig } from './td-switch.interface';
import {
  $switchButtonSize,
  $switchCoreHeight,
  $switchFontSize,
  $switchHeight,
  $switchOffColor,
  $switchOnColor
} from './td-switch.style';
import { TdSwitchCore } from './widget/td-switch-core';
import { TdSwitchLeft } from './widget/td-switch-left';
import { TdSwitchRight } from './widget/td-switch-right';

export class TdSwitch extends UI implements ITdSwitch {
  className: 'TdSwitch';
  input: Input;
  private left?: TdSwitchLeft;
  private core: TdSwitchCore;
  private right?: TdSwitchRight;
  override config?: ITdSwitchConfig;
  private activeValue: boolean | string | number;
  private inactiveValue: boolean | string | number;

  constructor(config?: ITdSwitchConfig) {
    super();
    this.className = 'TdSwitch';
    this.config = config;
    this.addStyleObj({
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      fontSize: $switchFontSize[config?.size || 'default'],
      lineHeight: $switchCoreHeight[config?.size || 'default'],
      height: $switchHeight[config?.size || 'default']
    });
    this.modelValue = config?.modelValue ?? false;
    this.activeValue = config?.activeValue ?? true;
    this.inactiveValue = config?.inactiveValue ?? false;
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
    if (!config?.inlinePrompt && (config?.inactiveIcon || config?.inactiveText)) {
      this.left = new TdSwitchLeft(config);
      this.addChild(this.left);
    }
    this.core = new TdSwitchCore(Object.assign({}, config, {
      modelValue: this.modelValue,
      activeValue: this.activeValue,
      inactiveValue: this.inactiveValue
    }));
    this.addChild(this.core);
    if (!config?.inlinePrompt && (config?.activeIcon || config?.activeText)) {
      console.log('td-switch right .');
      this.right = new TdSwitchRight(config);
      this.addChild(this.right);
    }
    this.setChecked(this.modelValue === this.activeValue);
    this.setConfig(config);
  }

  override setConfig(config?: ITdSwitchConfig) {
    super.setConfig(config);
    // todo
    console.log('td-switch setConfig . ');
    if (config?.disabled) {
      this.setDisabled(config?.disabled);
    }
  }

  override initEvents() {
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
    const config = this.config;
    const checked = this.modelValue === this.activeValue;
    // this.modelValue = !this.modelValue;
    this.modelValue = checked ? this.inactiveValue : this.activeValue;
    const val = checked ? this.inactiveValue : this.activeValue;
    // emit(UPDATE_MODEL_EVENT, val)
    // emit(CHANGE_EVENT, val)
    // emit(INPUT_EVENT, val)
    nextTick(() => {
      this.input.dom.checked = !checked;
      console.log('handleChange . this.input.dom.checked is ', checked);
      // this.input.setValue(val);
      this.setChecked(!checked);
    });
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.addStyleObj({
        opacity: 0.6
      });
      this.input.addAttrObj({
        disabled: true,
        ariaDisabled: true
      });
      this.left?.setStyleObj({
        cursor: StyleCursor.notAllowed
      });
      this.core.setStyleObj({
        cursor: StyleCursor.notAllowed
      });
    } else {
      this.addStyleObj({
        opacity: 1
      });
      this.input.addAttrObj({
        disabled: false,
        ariaDisabled: false
      });
      this.left?.setStyleObj({
        cursor: StyleCursor.auto
      });
      this.core.setStyleObj({
        cursor: StyleCursor.auto
      });
    }
  }

  setChecked(checked: boolean) {
    if (checked) {
      this.core.setStyleObj({
        backgroundColor: this.config?.switchOnColor ?? $switchOnColor
      });
      this.core.action.setStyleObj({
        color: $switchOnColor,
        // left: calc(100% - #{map.get($switch-button-size, 'default') + 1px});
        left: 'calc(100% - ' + $switchButtonSize[this.config?.size || 'default'] + ' - 1px)'
      });
      if (this.right) {
        this.right.setStyleObj({
          color: $colors.primary.base
        });
      }
      if (this.left) {
        this.left.setStyleObj({
          color: $colors.default.base
        });
      }
      if (this.config?.inlinePrompt) {
        this.core.setInnerChecked(true);
      }
      if (this.config?.activeActionIcon) {
        this.core.actionIcon?.replaceSvg(this.config.activeActionIcon);
      } else if (this.config?.activeActionText) {
        this.core.actionSpan?.textNode?.setText(this.config.activeActionText);
      }
    } else {
      this.core.setStyleObj({
        backgroundColor: this.config?.switchOffColor ?? $switchOffColor
      });
      this.core.action.setStyleObj({
        left: '1px',
        color: $switchOffColor
      });
      if (this.left) {
        this.left.setStyleObj({
          color: $colors.primary.base
        });
      }
      if (this.right) {
        this.right.setStyleObj({
          color: $colors.default.base
        });
      }
      if (this.config?.inlinePrompt) {
        this.core.setInnerChecked(false);
      }
      if (this.config?.inactiveActionIcon) {
        this.core.actionIcon?.replaceSvg(this.config.inactiveActionIcon);
      } else if (this.config?.inactiveActionText) {
        this.core.actionSpan?.textNode?.setText(this.config.inactiveActionText);
      }
    }
  }

  switchValue() {
    console.log('switchValue . ');
    const config = this.config;

    if (config?.loading || config?.disabled) {
      return;
    }
    const beforeChange = config?.beforeChange;
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
      console.error('beforeChange must return type `Promise<boolean>` or `boolean`');
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
