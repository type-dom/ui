import { Input, Span, TextNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdCheckboxConfig } from '../td-checkbox/td-checkbox.interface';
import { ITdCheckboxButton } from './td-checkbox-button.interface';
import {
  $checkboxButton,
  $checkboxButtonInnerStyle,
  $checkboxButtonOriginalStyle,
  $checkboxButtonStyle,
  useCheckboxButtonStyle,
} from './td-checkbox-button.style';
import {
  $border,
  $borderColor, $borderRadius,
  $button,
  $colors,
  $disabled,
  $fontSizes,
  ISize
} from '../../../styles';
import {
  $buttonPaddingHorizontal,
  $buttonPaddingVertical,
  buttonSize,
} from '../../basic/td-button/td-button.style';
import { $checkbox } from '../td-checkbox/td-checkbox.style';

export class TdCheckboxButton extends UI implements ITdCheckboxButton {
  className: 'TdCheckboxButton';
  override props: ITdCheckboxConfig;
  private isFocused?: boolean;
  private isLimitExceeded?: boolean;
  private actualValue?: string | number | boolean;
  private intermediate?: string | number | boolean;

  constructor(params: ITdCheckboxConfig = {}) {
    super(); // label | span
    this.className = 'TdCheckboxButton';
    this.useTag('label');
    this.attr.addObj({
      name: 'td-checkbox-button',
    });
    useCheckboxButtonStyle(params);
    this.style.addObj($checkboxButtonStyle);
    const original = new Input({
      name: 'original',
      attrObj: {
        type: 'checkbox',
        disabled: params?.disabled, // todo group or form disabled
        value: this.actualValue,
        intermediate: this.intermediate,
      },
      styleObj: $checkboxButtonOriginalStyle,
      events: {
        click: (ev) => {
          ev?.stopPropagation();
        },
        change: (ev) => {
          this.handleChange(ev);
        },
        focus: (evt) => {
          this.isFocused = true;
        },
        blur: (evt) => {
          this.isFocused = false;
        },
      },
    });
    this.addChild(original);
    const labelSpan = new Span({
      name: 'inner',
      styleObj: $checkboxButtonInnerStyle,
    });
    if (params?.slot) {
      labelSpan.slotChild(params.slot);
    } else if (params?.label) {
      labelSpan.addChild(new TextNode(params?.label));
    }
    this.addChild(labelSpan);
    this.addEvents({
      click: (evt?: MouseEvent) => {
        // todo
        console.log('click . ');
        if (this.props.disabled) {
          return;
        }
        // const input = this.down<Input>('name', 'original')!;
        // const checked = (input.dom.checked = !input.dom.checked);
        const checked = !this.props.checked;
        this.setChecked(checked);
      },
    });
    this.props = this.useParams(params);
  }

  get checkedValue() {
    return this.down<Input>('name', 'original')?.dom.checked;
  }

  handleChange(ev?: Event) {
    if (this.isLimitExceeded) return;

    const target = ev?.target as HTMLInputElement;
    // emit('change', getLabeledValue(target.checked), e)
  }

  setChecked(checked?: number | string | boolean) {
    //   todo 待实现 选中、不选中
    console.log('setChecked . checked is ', checked);
    const inner = this.down('name', 'inner');
    const input = this.down<Input>('name', 'original')!;
    input.dom.checked = !!checked;
    this.props.checked = !!checked;
    if (checked) {
      inner?.style?.setObj({
        color: $checkboxButton.checkedTextColor,
        backgroundColor: $checkboxButton.checkedBgColor,
        borderColor: $checkboxButton.checkedBorderColor,
        boxShadow: '-1px 0 0 0 ' + $colors.primary['light-7'],
      });
    } else {
      inner?.style?.setObj({
        color: $button.textColor,
        backgroundColor: $button.bgColor,
        borderColor: $button.borderColor,
        boxShadow: undefined,
      });
    }
    if (this.props.disabled) {
      this.setDisabled(true);
    }
  }

  setDisabled(disabled: boolean) {
    const label = this.down('name', 'label');
    const inner = this.down('name', 'inner');
    this.props.disabled = disabled;
    if (disabled) {
      inner?.style?.setObj({
        color: $disabled.textColor,
        cursor: 'not-allowed',
        backgroundColor: $button.disabled.bgColor,
        borderColor: $button.disabled.borderColor,
        boxShadow: 'none',
      });
    } else {
      inner?.style?.setObj({
        color: $button.textColor,
        cursor: 'pointer',
        background: $button.bgColor,
        border: $border,
      });
    }
  }

  setSize(size: ISize) {
    const paddingVertical = $buttonPaddingVertical[size];
    const paddingHorizontal = $buttonPaddingHorizontal[size];
    const sizeStyle = buttonSize(
      paddingVertical,
      paddingHorizontal,
      $fontSizes[size],
      0
    );
    const inner = this.down<Span>('name', 'inner');
    inner?.style.setObj(sizeStyle);
  }
  // 在CheckboxGroup中位于首位时
  setFirstStyle() {
    const inner = this.down<Span>('name', 'inner');
    inner?.style.setObj({
      borderLeft: $border,
      borderTopLeftRadius: $borderRadius.base,
      borderBottomLeftRadius: $borderRadius.base,
      boxShadow: 'none !important'
    })
  }

  setLastStyle() {
    const inner = this.down<Span>('name', 'inner');
    inner?.style.setObj({
      borderTopRightRadius: $borderRadius.base,
      borderBottomRightRadius: $borderRadius.base
    })
  }
}
