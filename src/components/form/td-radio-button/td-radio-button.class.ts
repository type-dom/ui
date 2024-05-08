import { fromEvent } from 'rxjs';
import { Input, Span, StyleCursor, TypeLabel } from '@type-dom/framework';
import {
  $borderColor, $borderRadiusMap,
  $borderStyle,
  $borderWidth,
  $buttonBgColor,
  $colors, $colorWhite,
  $commonComponentSize, $fillColor, $fontSizes,
  $fontWeightPrimary, $paddingHorizontalMap, $paddingVerticalMap, $textColor
} from '../../../styles/var';
import { UI } from '../../../ui/ui.abstract';
import { TdRadioGroup } from '../td-radio-group/td-radio-group.class';
import { ITdRadioButton, ITdRadioButtonConfig } from './td-radio-button.interface';

export class TdRadioButton extends UI implements ITdRadioButton {
  className: 'TdRadioButton';
  inputOriginal: Input;
  radioLabel: Span;
  override config?: ITdRadioButtonConfig;
  private disabled?: boolean;

  constructor(config?: ITdRadioButtonConfig) {
    super({ tag: 'label' });
    this.className = 'TdRadioButton';
    this.addAttrName('radio-button');
    this.addStyleObj({
      position: 'relative',
      display: 'inline-block',
      outline: 'none'
    });
    this.inputOriginal = new Input({
      attrObj: {
        type: 'radio',
        name: 'radio-button-name',
        value: 'radio-value'
      },
      styleObj: {
        opacity: 0,
        outline: 'none',
        margin: '0',
        position: 'absolute',
        zIndex: -1
        // top: '0',
        // left: '0',
        // right: '0',
        // bottom: '0',
        // margin: '0',
      }
    });
    this.radioLabel = new Span({
      name: 'radio-label',
      text: config?.label || 'option',
      styleObj: {
        display: 'inline-block',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        // borderLeft: '0',
        '-webkit-appearance': 'none',
        textAlign: 'center',
        boxSizing: 'border-box',
        outline: 'none',
        margin: '0',
        position: 'relative',
        cursor: StyleCursor.pointer,
        userSelect: 'none',
        // 下面是会变化的样式；
        color: $textColor.regular,
        background: $fillColor.blank,
        borderWidth: $borderWidth,
        borderStyle: $borderStyle,
        borderColor: $borderColor.base,
        fontWeight: $fontWeightPrimary,
        // color: $buttonTextColor.default,
        // transition: getCssVar('transition-all'),
        fontSize: $fontSizes.base,
        padding: $paddingVerticalMap.default + ' ' + $paddingHorizontalMap.default
      }
    });
    this.addChildren(this.inputOriginal, this.radioLabel);
    this.setConfig(config);
  }

  override setConfig(config?: ITdRadioButtonConfig): void {
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
    // size 默认值是 default
    const size = config?.size || 'default';
    this.addStyleObj({
      height: $commonComponentSize[size]
    });
    this.radioLabel.addStyleObj({
      padding: $paddingVerticalMap[size] + ' ' + $paddingHorizontalMap[size],
      fontSize: $fontSizes[size]
    });
    if (config?.isFirst) {
      const radius = $borderRadiusMap[size];
      this.radioLabel.addStyleObj({
        borderRadius: radius + ' 0 0 ' + radius
      });
    } else {
      this.radioLabel.addStyleObj({
        borderLeft: '0'
      });
    }
    if (config?.isLast) {
      const radius = $borderRadiusMap[size];
      this.radioLabel.addStyleObj({
        borderRadius: '0 ' + radius + ' ' + radius + ' 0'
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
    } else {
      this.setStyleObj({
        cursor: StyleCursor.pointer,
        opacity: 1,
        pointerEvents: 'auto'
      });
      this.inputOriginal.removeAttribute('disabled');
    }
  }

  setChecked(checked: boolean): void {
    if (checked) {
      this.inputOriginal.setAttrObj({
        checked: true
      });
      //  设置选中样式
      this.radioLabel.setStyleObj({
        color: $colorWhite,
        backgroundColor: $colors.primary.base
      });
    } else {
      this.inputOriginal.removeAttribute('checked');
      // 设置非选中样式
      this.radioLabel.setStyleObj({
        borderColor: $borderColor.base,
        background: $fillColor.blank,
        color: $colors.default.base
      });
    }
  }

  override initEvents(): void {
    this.addEvents({
      // 点击事件 todo 会触发两次，先不管。
      click: (evt) => {
        console.log('radio-button this.subscriptions is ', this.subscriptions);
        console.log('radio-button this.inputOriginal.dom click . ');
        console.log('radio-button this.inputOriginal.dom.value is ', this.inputOriginal.dom.value);
        if (this.disabled) {
          evt?.preventDefault();
          return;
        }
        // this.inputOriginal.dom.click();
        if (this.parent instanceof TdRadioGroup) {
          this.parent.setModelValue(this.inputOriginal.value); // 触发父级的事件，重置整个组。
        }
        this.setChecked(true);
        this.parent?.childNodes.forEach((node) => {
          if (node instanceof TdRadioButton &&
            node.inputOriginal.attrObj.name === this.inputOriginal.attrObj.name &&
            node !== this) {
            node.setChecked(false);
          }
        });
      }
    });
  }
}
