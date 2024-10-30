import { Input, Span } from '@type-dom/framework';
import {
  $borderColor,
  $borderStyle,
  $borderWidth,
  $buttonBgColor,
  $colors,
  $colorWhite,
  $commonComponentSize,
  $fillColor,
  $fontSizes,
  $fontWeightPrimary,
  $textColor
} from '../../../styles/var';
import { UI } from '../../../ui/ui.abstract';
import {
  $buttonBorderRadius,
  $buttonPaddingHorizontal,
  $buttonPaddingVertical
} from '../../basic/td-button/td-button.style';
import { TdRadioGroup } from '../td-radio-group/td-radio-group.class';
import {
  ITdRadioButton,
  ITdRadioButtonConfig
} from './td-radio-button.interface';

export class TdRadioButton extends UI implements ITdRadioButton {
  className: 'TdRadioButton';
  inputOriginal: Input;
  radioLabel: Span;
  override props: ITdRadioButtonConfig;
  private disabled?: boolean;

  constructor(params: ITdRadioButtonConfig = {}) {
    super();
    this.useTag('label');
    this.className = 'TdRadioButton';
    this.attr.addName('radio-button');
    this.style.addObj({
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
      text: params?.label || 'option',
      styleObj: {
        display: 'inline-block',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        // borderLeft: '0',
        WebkitAppearance: 'none',
        textAlign: 'center',
        boxSizing: 'border-box',
        outline: 'none',
        margin: '0',
        position: 'relative',
        cursor: 'pointer',
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
        padding:
          $buttonPaddingVertical.default + ' ' + $buttonPaddingHorizontal.default
      }
    });
    this.addChildren(this.inputOriginal, this.radioLabel);
    this.props = this.useParams(params);
  }

  override setup(): void {
    const props = this.props;
    if (props.name) {
      console.log('setConfig props.name', props.name);
      this.inputOriginal.attr.addName(props.name);
    }
    if (props.value) {
      this.inputOriginal.attr.addObj({ value: props.value });
    }
    if (props.checked) {
      this.inputOriginal.attr.addObj({ checked: props.checked || false });
    }
    if (props?.label) {
      this.radioLabel.textNode?.setText(props.label);
    }
    if (props?.disabled) {
      this.inputOriginal.attr.addObj({ disabled: props.disabled });
      //   todo 样式
    }
    // size 默认值是 default
    const size = props?.size || 'default';
    this.style.addObj({
      height: $commonComponentSize[size]
    });
    this.radioLabel.style.addObj({
      padding: $buttonPaddingVertical[size] + ' ' + $buttonPaddingHorizontal[size],
      fontSize: $fontSizes[size]
    });
    if (props?.isFirst) {
      const radius = $buttonBorderRadius[size];
      this.radioLabel.style.addObj({
        borderRadius: radius + ' 0 0 ' + radius
      });
    } else {
      this.radioLabel.style.addObj({
        borderLeft: '0'
      });
    }
    if (props?.isLast) {
      const radius = $buttonBorderRadius[size];
      this.radioLabel.style.addObj({
        borderRadius: '0 ' + radius + ' ' + radius + ' 0'
      });
    }
    if (props?.checked) {
      this.setChecked(!!props?.checked);
    }
    if (props?.disabled) {
      this.setDisabled(props?.disabled);
    }
    this.addEvents({
      // 点击事件 todo 会触发两次，先不管。
      click: (evt) => {
        console.log('radio-button this.inputOriginal.dom click . ');
        console.log(
          'radio-button this.inputOriginal.dom.value is ',
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
            node instanceof TdRadioButton &&
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
    } else {
      this.style.setObj({
        cursor: 'pointer',
        opacity: 1,
        pointerEvents: 'auto'
      });
      this.inputOriginal.attr.remove('disabled');
    }
  }

  setChecked(checked: boolean): void {
    if (checked) {
      this.inputOriginal.attr.setObj({
        checked: true
      });
      //  设置选中样式
      this.radioLabel.style.setObj({
        color: $colorWhite,
        backgroundColor: $colors.primary.base
      });
    } else {
      this.inputOriginal.attr.remove('checked');
      // 设置非选中样式
      this.radioLabel.style.setObj({
        borderColor: $borderColor.base,
        background: $fillColor.blank,
        color: $colors.default.base
      });
    }
  }
}
