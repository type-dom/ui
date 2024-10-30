import { nextTick, Span } from '@type-dom/framework';
import { isArray } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { $checkboxGroupStyle } from '../td-checkbox/td-checkbox.style';
import { TdCheckbox } from '../td-checkbox/td-checkbox.class';
import { CheckboxValueType } from '../td-checkbox/td-checkbox.interface';
import { TdCheckboxButton } from '../td-checkbox-button/td-checkbox-button.class';
import {
  CheckboxGroupValueType,
  ITdCheckboxGroup,
  ITdCheckboxGroupConfig
} from './td-checkbox-group.interface';
import { $border, $borderRadius } from '../../../styles';

export class TdCheckboxGroup extends UI implements ITdCheckboxGroup {
  className: 'TdCheckboxGroup';
  override props: ITdCheckboxGroupConfig;
  override childNodes: (TdCheckbox | TdCheckboxButton)[];

  constructor(params: ITdCheckboxGroupConfig = { modelValue: [] }) {
    super();
    this.className = 'TdCheckboxGroup';
    this.useTag(params.tag);
    this.childNodes = [];
    this.attr.addObj({
      role: 'group',
      // ariaLabel: !config.isLabeledByFormItem ? config?.ariaLabel || 'checkbox-group' : undefined,
      // aria-labelledby="isLabeledByFormItem ? formItem?.labelId : undefined"
    });
    this.style.addObj($checkboxGroupStyle);
    // this.addChild(this.getSlotNode());
    if (params.slot) { // 这样子节点就是TdCheckbox组件了，不需要 SlotNode 再包一层；哪怕 SlotNode只是虚拟节点；
      this.slotChild(params.slot);
    }
    if (params.size) {
      this.childNodes.map(item => item.props.size = params.size)
    }
    this.buildProps({ // 默认属性值
      modelValue: [],
      tag: 'div',
      validateEvent: true,
    });
    this.props = this.useParams(params);
    this.addEmits({
      [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
      change: (val: CheckboxValueType[]) => isArray(val),
    });
  }

  override setup() {
  // 处理子节点和组合框的属性关系
    this.childNodes.forEach((child: TdCheckbox | TdCheckboxButton, index: number) => {
      const value = child.props.value;
      if (index === 0 && child instanceof TdCheckboxButton) {
        child.setFirstStyle();
      } else if (index === this.childNodes.length - 1 && child instanceof TdCheckboxButton) {
        child.setLastStyle();
      }
      if (this.props.modelValue.includes(value)) {
        child.setChecked(true);
      }
      if (this.props.size) {
        child.setSize(this.props.size);
      }
      if (this.props.disabled) {
        child.setDisabled(true);
      }
      if (this.props.min || this.props.max) {
        this.setMinMax(child);
      }
      child.addEvents({
        click: (evt) => {
          console.log('child click', evt, child);
          if (child.props.disabled) {
            return;
          }
          const checked = child.checkedValue;
          // 处理 modelValue 的更新
          if (checked) {
            if (this.props.modelValue.indexOf(value) === -1) {
              this.props.modelValue.push(value);
            }
            this.childNodes.forEach(chd => {
              if (this.props.min || this.props.max) {
                this.setMinMax(chd);
              }
            })
          } else {
            if (this.props.modelValue.indexOf(value) > -1) {
              this.props.modelValue.splice(this.props.modelValue.indexOf(value), 1);
            }
            this.childNodes.forEach(chd => {
              if (this.props.min || this.props.max) {
                this.setMinMax(chd);
              }
            })
          }
          this.changeEvent(this.props.modelValue as CheckboxGroupValueType);
        }
      })
    })
  }

  changeEvent = async (value: CheckboxGroupValueType) => {
    this.emit(UPDATE_MODEL_EVENT, value);
    await nextTick();
    this.emit('change', value);
  };

  setMinMax(checkbox: TdCheckbox | TdCheckboxButton) {
    const value = checkbox.props.value;
    if (this.props.modelValue.includes(value)) {
      if (this.props.min && this.props.min === this.props.modelValue.length) {
        checkbox.setDisabled(true);
      } else if (this.props.max && this.props.max === this.props.modelValue.length) {
        checkbox.setDisabled(false);
      } else {
        checkbox.setDisabled(false);
      }
      checkbox.setChecked(true);
    } else {
      if (this.props.min && this.props.min === this.props.modelValue.length) {
        checkbox.setDisabled(false);
      } else if (this.props.max && this.props.max === this.props.modelValue.length) {
        checkbox.setDisabled(true);
      } else {
        checkbox.setDisabled(false);
      }
      // checkbox.setChecked(checkbox.props.checked);
    }
  }
}
