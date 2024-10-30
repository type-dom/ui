import { Input, nextTick, Span, TextNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { useCheckbox } from './composables/use-checkbox';
import {
  $checkbox,
  $checkboxInnerAfterStyle, $checkboxInnerBeforeStyle,
  $checkboxInnerStyle,
  $checkboxInputStyle,
  $checkboxLabelStyle,
  $checkboxOriginalStyle,
  $checkboxStyle, useCheckboxStyle, useSize
} from './td-checkbox.style';
import { CheckboxValueType, ITdCheckbox, ITdCheckboxConfig } from './td-checkbox.interface';
import {
  $border,
  $borderColor,
  $colorPrimary,
  $colors,
  $colorWhite,
  $disabled,
  $fillColor,
  ISize
} from '../../../styles';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { isBoolean, isNumber, isString } from '@type-dom/utils';

export class TdCheckbox extends UI implements ITdCheckbox {
  className: 'TdCheckbox';
  override props: ITdCheckboxConfig;
  private isFocused?: boolean;
  private isLimitExceeded?: boolean;
  private actualValue?: string | number | boolean;
  private intermediate?: string | number | boolean;
  private hasOwnLabel?: boolean;
  private isDisabled?: boolean;
  private isLabeledByFormItem?: boolean;
  private model?: any;

  constructor(params: ITdCheckboxConfig = {}) {
    super(); // label | span
    this.className = 'TdCheckbox';
    this.attr.addObj({
      name: 'td-checkbox'
    });
    useCheckboxStyle(params);
    const { hasOwnLabel } = useCheckbox(params);
    console.log('hasOwnLabel is ', hasOwnLabel);
    const tag = !hasOwnLabel ? 'span' : 'label';
    this.useTag(tag);
    this.props = this.buildProps({ validateEvent: true });
    this.style.addObj($checkboxStyle);
    const inputSpan = new Span({
      attrObj: {
        name: 'td-checkbox-input-span'
      },
      styleObj: $checkboxInputStyle,
      childNodes: [
        new Input({
          name: 'original',
          attrObj: {
            type: 'checkbox',
            disabled: params?.disabled, // todo group or form disabled
            value: this.actualValue,
            intermediate: this.intermediate,
          },
          styleObj: $checkboxOriginalStyle,
          events: {
            click: (ev) => {
              ev?.stopPropagation();
            },
            change: (ev) => {
              this.handleChange(ev as InputEvent);
            },
            focus: evt => {
              this.isFocused = true;
            },
            blur: evt => {
              this.isFocused = false;
            }
          }
        }),
        new Span({
          name: 'inner',
          styleObj: $checkboxInnerStyle,
          childNodes: [
            new Span({
              name: 'inner-before',
              styleObj: $checkboxInnerBeforeStyle,
            }),
            new Span({
              name: 'inner-after',
              styleObj: $checkboxInnerAfterStyle
            })
          ]
        }),
      ]
    });
    this.addChild(inputSpan);
    if (hasOwnLabel) {
      const labelSpan = new Span({
        name: 'label',
        styleObj: $checkboxLabelStyle,
      });
      if (params?.slot) {
        labelSpan.slotChild(params.slot);
      } else {
        labelSpan.slotChild(String(params.label || ''));
      }
      this.addChild(labelSpan);
    }
    this.addEvents({
      click: (evt?: MouseEvent) => {
      // todo
        console.log('click . ');
        if (this.props.disabled) {
          return;
        }
        const input = this.down<Input>('name', 'original')!;
        const checked = input.dom.checked = !input.dom.checked;
        this.setChecked(checked);
      }
    });

    this.addEmits({
      [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
        isString(val) || isNumber(val) || isBoolean(val),
      change: (val: CheckboxValueType) =>
        isString(val) || isNumber(val) || isBoolean(val),
    });
    this.props = this.useParams(params);
  }

  get checkedValue() {
    return this.down<Input>('name', 'original')?.dom.checked;
  }

  override mounted() {
    const input = this.down<Input>('name', 'original')!;
    if (this.props.modelValue) {
      input.dom.checked = true;
      this.props.checked = true;
    }
    if (this.props.indeterminate) {
      this.setIndeterminate(true);
    }
  }
  handleChange(ev?: InputEvent) {
    console.log('handleChange . ');
    if (this.isLimitExceeded) {
      return;
    }

    const target = ev?.target as HTMLInputElement;
    target.checked = !target.checked;
    this.props.checked = target.checked;
    // this.emit('change', target.checked, ev)
  }

  async onClickRoot(e: MouseEvent) {
    console.log('onClickRoot . ');
    if (this.isLimitExceeded) {
      return
    }

    if (!this.hasOwnLabel && !this.isDisabled && this.isLabeledByFormItem) {
      // fix: https://github.com/element-plus/element-plus/issues/9981
      const eventTargets: EventTarget[] = e.composedPath()
      const hasLabel = eventTargets.some(
        (item) => (item as HTMLElement).tagName === 'LABEL'
      );
      if (!hasLabel) {
        this.model = this.getLabeledValue(
          [false, this.props.falseValue, this.props.falseLabel].includes(this.model)
        );
        await nextTick();
        this.emitChangeEvent(this.model, e);
      }
    }
  }
  getLabeledValue(value: string | number | boolean) {
    return [true, this.props.trueValue, this.props.trueLabel].includes(value)
      ? this.props.trueValue ?? this.props.trueLabel ?? true
      : this.props.falseValue ?? this.props.falseLabel ?? false
  }

  emitChangeEvent(
    checked: string | number | boolean,
    e: InputEvent | MouseEvent
  ) {
    // this.emit('change', this.getLabeledValue(checked), e)
  }

  setChecked(checked?: number | string | boolean) {
  //   todo 待实现 选中、不选中
    console.log('setChecked . checked is ', checked);
    const label = this.down('name', 'label');
    const inner = this.down('name', 'inner');
    const innerAfter = this.down('name', 'inner-after');
    const innerBefore = this.down('name', 'inner-before');
    const input = this.down<Input>('name', 'original')!;
    input.dom.checked = !!checked;
    this.props.checked = !!checked;
    // this.props.modelValue = checked; // todo modelValue = checkbox.value
    if (checked) {
      label?.style?.setObj({
        color: $checkbox.checkedTextColor,
      });
      inner?.style?.setObj({
        borderColor: $checkbox.checkedInputBorderColor,
        background: $checkbox.checkedBgColor,
      });
      innerBefore?.style?.setObj({
        display: 'none',
      });
      innerAfter?.style?.setObj({
        transform: 'rotate(45deg) scaleY(1)',
        display: 'block',
        borderColor: $checkbox.checkedIconColor
      });
      if (this.props.border) {
        this.style?.setObj({
          borderColor: $colorPrimary
        });
      }
    } else {
      label?.style?.setObj({
        color: $checkbox.textColor,
      });
      innerAfter?.style?.setObj({
        transform: 'rotate(45deg) scaleY(0)',
      });
      innerBefore?.style?.setObj({
        display: 'none',
      });
      inner?.style?.setObj({
        borderColor: $borderColor.base,
        background: $checkbox.bgColor,
      });
      if (this.props.border) {
        if (this.props.disabled) {
          this.style?.setObj({
            borderColor: $borderColor.lighter
          });
        } else {
          this.style?.setObj({
            border: $border
          });
        }
      }
    }
    // if (this.props.indeterminate) {
    //   this.setIndeterminate(true);
    // }
    if (this.props.disabled) {
      this.setDisabled(true);
    }
  }

  setDisabled(disabled: boolean) {
    const label = this.down('name', 'label');
    const inner = this.down('name', 'inner');
    const innerAfter = this.down('name', 'inner-after');
    this.props.disabled = disabled;
    if (disabled) {
      this.style.addObj({
        cursor: 'not-allowed',
        borderColor: $borderColor.lighter,
        // pointerEvents: 'none',
      });
      label?.style?.setObj({
        color: $disabled.textColor,
        cursor: 'not-allowed',
      });
      inner?.style?.setObj({
        background: $checkbox.disabledInputFill,
        borderColor: $checkbox.disabledBorderColor,
        cursor: 'not-allowed',
      });
      innerAfter?.style?.setObj({
        cursor: 'not-allowed',
        borderColor: $checkbox.disabledIconColor
      });
    } else {
      this.style.setObj({
        cursor: 'pointer',
        borderColor: $borderColor.base,
      });
      label?.style?.setObj({
        color: '',
        cursor: '',
      });
      inner?.style?.setObj({
        background: $checkbox.bgColor,
        borderColor: $checkbox.inputBorder,
        cursor: 'pointer',
      });
      innerAfter?.style?.setObj({
        cursor: 'pointer',
        borderColor: $checkbox.checkedIconColor,
      })
    }
  }

  setIndeterminate(indeterminate: boolean) {
    this.props.indeterminate = indeterminate;
    const inner = this.down('name', 'inner');
    const innerAfter = this.down('name', 'inner-after');
    const innerBefore = this.down('name', 'inner-before');
    if (indeterminate) { // todo 部分选中
      innerBefore?.style?.setObj({
        display: 'block',
      });
      innerAfter?.style?.setObj({
        transform: 'rotate(45deg) scaleY(0)',
        display: 'none',
      });
      inner?.style?.setObj({
        borderColor: $checkbox.checkedInputBorderColor,
        background: $checkbox.checkedBgColor,
      });
      return;
    } else {
      innerBefore?.style?.setObj({
        display: 'none',
      });
      innerAfter?.style?.setObj({
        // transform: 'rotate(45deg) scaleY(1)',
        display: 'block',
      });
      // inner?.style?.setObj({
      //   borderColor: $borderColor.base,
      //   background: $checkbox.bgColor,
      // });
    }
  }

  setSize(size: ISize) {
    // todo
  }
}
