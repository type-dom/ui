import { fromEvent } from 'rxjs';
import { Input, Span, StyleCursor } from '@type-dom/framework';
import { UI } from '../../ui.abstract';
import {
  $borderColors, $borderRadius,
  $borderStyle,
  $borderWidth,
  $colors,
  $commonComponentSize, $fillColors,
  $fontSizes,
  $fontWeightPrimary,
  $textColors
} from '../../styles/var';
import { TdRadioGroup } from '../td-radio-group/td-radio-group.class';
import { ITdRadio, ITdRadioConfig } from './td-radio.interface';

export class TdRadio extends UI implements ITdRadio {
  className: 'TdRadio';
  inputOriginal: Input;
  inputInner: Span;
  radioInput: Span;
  radioLabel: Span;
  override config?: ITdRadioConfig;
  private disabled?: boolean;

  constructor(config?: ITdRadioConfig) {
    super({ tag: 'label' });
    this.className = 'TdRadio';
    this.addStyleObj({
      color: $textColors.regular,
      fontWeight: $fontWeightPrimary,
      position: 'relative',
      cursor: StyleCursor.pointer,
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      outline: 'none',
      fontSize: $fontSizes.base,
      userSelect: 'none',
      marginRight: '32px',
      height: $commonComponentSize.default
    });
    this.inputOriginal = new Input({
      attrObj: {
        type: 'radio',
        name: 'radio-name',
        value: 'radio-value'
      },
      styleObj: {
        opacity: 0,
        outline: 'none',
        position: 'absolute',
        zIndex: -1,
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: '0'
      }
    });
    this.inputInner = new Span({
      styleObj: {
        // radio-inner 样式
        position: 'relative',
        borderWidth: '1px',
        // borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: $borderColors.base,
        // borderColor: $colors.primary.base,
        borderRadius: '100%',
        // width: var(--el-radio-input-width),
        width: '14px',
        // height: var(--el-radio-input-height),
        height: '14px',
        // background-color: var(--el-radio-input-bg-color),
        backgroundColor: '#ffffff',
        cursor: StyleCursor.pointer,
        display: 'inline-block',
        boxSizing: 'border-box',
        transition: 'transform .15s ease-in'
      }
    });
    this.radioInput = new Span({
      styleObj: {
        whiteSpace: 'nowrap',
        cursor: StyleCursor.pointer,
        outline: 'none',
        display: 'inline-flex',
        position: 'relative',
        verticalAlign: 'middle'
      },
      childNodes: [this.inputOriginal, this.inputInner]
    });
    this.radioLabel = new Span({
      name: 'radio-label',
      text: config?.label || 'option',
      styleObj: {
        // 下面这些是变量，要动态复制的。
        // font-size: var(--el-radio-font-size),
        color: $colors.default.base,
        fontSize: $fontSizes.base,
        paddingLeft: '8px'
      }
    });
    this.addChildren(this.radioInput, this.radioLabel);
    this.setConfig(config);
  }

  override setConfig(config?: ITdRadioConfig): void {
    super.setConfig(config);
    if (config?.name) {
      console.log('setConfig config?.name', config?.name);
      this.inputOriginal.addAttrName(config.name);
    }
    if (config?.value) {
      this.inputOriginal.addAttrObj({ value: config.value });
    }
    if (config?.checked) {
      this.inputOriginal.addAttrObj({ checked: config.checked || false });
    }
    if (config?.label) {
      this.radioLabel.textNode?.setText(config.label);
    }
    if (config?.disabled) {
      this.inputOriginal.addAttrObj({ disabled: config.disabled });
      //   todo 样式
    }
    if (config?.size) {
      this.addStyleObj({
        height: $commonComponentSize[config.size]
      });
    }
    if (config?.border) {
      this.addStyleObj({
        borderWidth: $borderWidth,
        borderStyle: $borderStyle,
        borderColor: $borderColors.base,
        borderRadius: $borderRadius.base,
        padding: '0 19px 0 11px'
      });
    }
    if (config?.checked) {
      this.setChecked(config?.checked);
    }
    if (config?.disabled) {
      this.setDisabled(config?.disabled);
    }
  }

  setDisabled(disabled?: boolean): void {
    this.disabled = disabled;
    if (disabled) {
      this.setStyleObj({
        cursor: StyleCursor.notAllowed,
        opacity: 0.5
        //   禁用事件
        //   pointerEvents: 'none',
      });
      this.radioLabel.setStyleObj({
        color: $colors.default.base
      });
      this.inputOriginal.setAttrObj({ disabled: true });
      this.inputInner.setStyleObj({
        cursor: StyleCursor.notAllowed,
        // color: $colors.default.base,
        // borderWidth: '1px',
        // borderStyle: 'solid',
        borderColor: $textColors.placeholder // $borderColors.base,
        // backgroundColor: $textColors.placeholder,
        // transform: 'translate(-50%, -50%) scale(1)'
      });
    } else {
      this.setStyleObj({
        cursor: StyleCursor.pointer,
        opacity: 1,
        pointerEvents: 'auto'
      });
      this.inputOriginal.removeAttribute('disabled');
      this.inputInner.setStyleObj({
        cursor: StyleCursor.auto
      });
    }
  }

  setChecked(checked: boolean): void {
    if (checked) {
      this.setStyleObj({
        borderColor: $colors.primary.base
      });
      this.inputOriginal.setAttrObj({
        checked: true
      });
      //  设置选中样式
      this.radioLabel.setStyleObj({
        color: $colors.primary.base
      });
      this.inputInner.setStyleObj({
        color: $colors.primary.base,
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: $colors.primary.base
      });
    } else {
      // 设置非选中样式
      this.setStyleObj({
        borderColor: $borderColors.base
      });
      this.inputOriginal.removeAttribute('checked');
      this.radioLabel.setStyleObj({
        color: $colors.default.base
      });
      this.inputInner.setStyleObj({
        color: $colors.default.base,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: $borderColors.base
      });
    }
  }

  override initEvents(): void {
    // 点击事件 todo 会触发两次，先不管。
    this.addEvents({
      click: (evt) => {
        console.log('this.subscriptions is ', this.subscriptions);
        console.log('this.inputOriginal.dom click . ');
        console.log('this.inputOriginal.dom.value is ', this.inputOriginal.dom.value);
        if (this.disabled) {
          evt?.preventDefault();
          return;
        }
        // this.inputOriginal.dom.click();
        if (this.parent instanceof TdRadioGroup) {
          this.parent.setValue(this.inputOriginal.value); // 触发父级的事件，重置整个组。
        }
        this.setChecked(true);
        this.parent?.childNodes.forEach((node) => {
          if (node instanceof TdRadio &&
            node.inputOriginal.attrObj.name === this.inputOriginal.attrObj.name &&
            node !== this) {
            node.setChecked(false);
          }
        });
      }
    });
  }
}
