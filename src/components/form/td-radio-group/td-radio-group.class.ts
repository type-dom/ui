import { IJsonData, IJsonDataProp, IPrimitive, XProxy } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdRadio } from '../td-radio/td-radio.class';
import { ITdRadioConfig } from '../td-radio/td-radio.interface';
import { TdRadioButton } from '../td-radio-button/td-radio-button.class';
import { ITdRadioGroup, ITdRadioGroupConfig } from './td-radio-group.interface';

export class TdRadioGroup extends UI implements ITdRadioGroup {
  className: 'TdRadioGroup';
  // modelValue?: IPrimitive | XProxy<IJsonData>;
  disabled?: boolean;
  override childNodes: TdRadio[];
  override config?: ITdRadioGroupConfig;

  constructor(config?: ITdRadioGroupConfig) {
    super();
    this.className = 'TdRadioGroup';
    this.addStyleObj({
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: '0',
      marginRight: '12px'
    });
    this.childNodes = [];
    this.setConfig(config);
  }

  get resultValue(): IPrimitive  | IJsonData | IJsonDataProp[] {
    if (this.modelValue instanceof XProxy) {
      return this.modelValue.value as IPrimitive;
    } else {
      return this.modelValue;
    }
  }
  override setConfig(config?: ITdRadioGroupConfig): void {
    super.setConfig(config);
    this.config = config;
    if (config?.modelValue) {
      this.modelValue = config.modelValue;
      console.log('this.modelValue is is ', this.modelValue);
    }
    if (config?.options) {
      this.setRadios(config.options);
    }
  }

  setRadios(options: ITdRadioConfig[]): void {
    this.clearChildren();
    const random = Math.random();
    options.forEach((opt, index) => {
      opt.parent = this; // 父级
      if (index === 0) {
        opt.isFirst = true;
      } else if (index === options.length - 1) {
        opt.isLast = true;
      }
      if (opt.name) { /* empty */
      } else {
        opt.name = 'radio-name' + random;
      }
      // 当存在 resultValue 时，清理options中设置的checked
      if (this.resultValue !== undefined) {
        delete opt.checked;
      }
      let radioObj;
      if (this.config?.isButton) {
        radioObj = new TdRadioButton(opt);
      } else {
        radioObj = new TdRadio(opt);
      }
      if (this.resultValue === opt.value) { // 反显
        radioObj.setChecked(true);
      } else if (opt.checked) {
        // this.modelValue = opt.value;
        this.setModelValue(opt.value);
        // 设置选中样式
        radioObj.setChecked(true);
      }
      if (this.config?.disabled) {
        radioObj.setDisabled(this.config.disabled);
      }
      this.addChild(radioObj);
    });
  }

  setModelValue(value: IPrimitive): void {
    console.error('setModelValue value is ', value);
    if (this?.modelValue instanceof XProxy) {
      this.modelValue.setValue(value)
    } else {
      this.modelValue = value;
    }
    // console.error('value is ', value);
    this.childNodes.forEach((opt) => {
      if (String(opt.inputOriginal.attrObj.value) === String(value)) {
        // 设置选中样式
        opt.setChecked(true);
      } else {
        // 设置非选中样式
        opt.setChecked(false);
      }
    });
  }
}
