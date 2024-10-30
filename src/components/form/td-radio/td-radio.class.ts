import { Input, Span } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import {
  $borderColor,
  $borderRadius,
  $borderStyle,
  $borderWidth,
  $colors,
  $commonComponentSize,
  $fontSizes,
  $fontWeightPrimary,
  $textColor
} from '../../../styles/var';
import { TdRadioGroup } from '../td-radio-group/td-radio-group.class';
import { ITdRadio, ITdRadioConfig } from './td-radio.interface';

export class TdRadio extends UI implements ITdRadio {
  className: 'TdRadio';
  override props: ITdRadioConfig
  inputOriginal: Input;
  inputInner: Span;
  radioInput: Span;
  radioLabel: Span;
  private disabled?: boolean;

  constructor(params: ITdRadioConfig = {}) {
    super();
    this.useTag('label');
    this.className = 'TdRadio';
    this.style.addObj({
      color: $textColor.regular,
      fontWeight: $fontWeightPrimary,
      position: 'relative',
      cursor: 'pointer',
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
      name: 'radio-name',
      attrObj: {
        type: 'radio',
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
      name: 'inner',
      styleObj: {
        // radio-inner 样式
        position: 'relative',
        borderWidth: '1px',
        // borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: $borderColor.base,
        // borderColor: $colors.primary.base,
        borderRadius: '100%',
        // width: var(--el-radio-input-width),
        width: '14px',
        // height: var(--el-radio-input-height),
        height: '14px',
        // background-color: var(--el-radio-input-bg-color),
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        display: 'inline-block',
        boxSizing: 'border-box',
        transition: 'transform .15s ease-in'
      }
    });
    this.radioInput = new Span({
      styleObj: {
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        outline: 'none',
        display: 'inline-flex',
        position: 'relative',
        verticalAlign: 'middle'
      },
      childNodes: [this.inputOriginal, this.inputInner]
    });
    this.radioLabel = new Span({
      name: 'radio-label',
      text: params?.label || 'option',
      styleObj: {
        // 下面这些是变量，要动态复制的。
        // font-size: var(--el-radio-font-size),
        color: $colors.default.base,
        fontSize: $fontSizes[params?.size || 'base'],
        paddingLeft: '8px'
      }
    });
    this.addChildren(this.radioInput, this.radioLabel);
    this.props = this.useParams(params);
    // 点击事件 todo 会触发两次，先不管。
    this.addEvents({
      click: (evt) => {
        console.log('this.inputOriginal.dom click . ');
        console.log(
          'this.inputOriginal.dom.value is ',
          this.inputOriginal.dom.value
        );
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
          if (
            node instanceof TdRadio &&
            node.inputOriginal.attr.get('name') ===
            this.inputOriginal.attr.get('name') &&
            node !== this
          ) {
            node.setChecked(false);
          }
        });
      }
    });
  }

  override setup(): void {
    const props = this.props;
    if (props?.name) {
      console.log('setConfig props?.name', props?.name);
      this.inputOriginal.attr.addName(props.name);
    }
    if (props?.value) {
      this.inputOriginal.attr.addObj({ value: props.value });
    }
    if (props?.checked) {
      this.inputOriginal.attr.addObj({ checked: props.checked || false });
    }
    if (props?.label) {
      this.radioLabel.textNode?.setText(props.label);
    }
    if (props?.disabled) {
      this.inputOriginal.attr.addObj({ disabled: props.disabled });
      //   todo 样式
    }
    if (props?.size) {
      this.style.addObj({
        height: $commonComponentSize[props.size],
        fontSize: $fontSizes[props.size]
      });
    }
    if (props?.border) {
      this.style.addObj({
        borderWidth: $borderWidth,
        borderStyle: $borderStyle,
        borderColor: $borderColor.base,
        borderRadius: $borderRadius.base,
        padding: '0 19px 0 11px'
      });
    }
    if (props?.checked) {
      this.setChecked(props.checked);
    }
    if (props?.disabled) {
      this.setDisabled(props.disabled);
    }
  }

  setDisabled(disabled?: boolean): void {
    this.disabled = disabled;
    if (disabled) {
      this.style.setObj({
        cursor: 'not-allowed',
        opacity: 0.5
        //   禁用事件
        //   pointerEvents: 'none',
      });
      this.radioLabel.style.setObj({
        color: $colors.default.base
      });
      this.inputOriginal.attr.setObj({ disabled: true });
      this.inputInner.style.setObj({
        cursor: 'not-allowed',
        // color: $colors.default.base,
        // borderWidth: '1px',
        // borderStyle: 'solid',
        borderColor: $textColor.placeholder // $borderColors.base,
        // backgroundColor: $textColors.placeholder,
        // transform: 'translate(-50%, -50%) scale(1)'
      });
    } else {
      this.style.setObj({
        cursor: 'pointer',
        opacity: 1,
        pointerEvents: 'auto'
      });
      this.inputOriginal.attr.remove('disabled');
      this.inputInner.style.setObj({
        cursor: 'auto'
      });
    }
  }

  setChecked(checked: boolean): void {
    if (checked) {
      this.style.setObj({
        borderColor: $colors.primary.base
      });
      this.inputOriginal.attr.setObj({
        checked: true
      });
      //  设置选中样式
      this.radioLabel.style.setObj({
        color: $colors.primary.base
      });
      this.inputInner.style.setObj({
        color: $colors.primary.base,
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: $colors.primary.base
      });
    } else {
      // 设置非选中样式
      this.style.setObj({
        borderColor: $borderColor.base
      });
      this.inputOriginal.attr.remove('checked');
      this.radioLabel.style.setObj({
        color: $colors.default.base
      });
      this.inputInner.style.setObj({
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: $borderColor.base,
        color: $colors.default.base
      });
    }
  }
}
