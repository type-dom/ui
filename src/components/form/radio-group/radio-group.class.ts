import { IOptionConfig, TypeDiv } from '@type-dom/framework';
import { RadioOption } from './radio-option/radio-option.class';
import { IRadioGroup, IRadioGroupConfig } from './radio-group.interface';

export class RadioGroup extends TypeDiv implements IRadioGroup {
  className: 'RadioGroup';
  override childNodes: RadioOption[];
  value: string | number | boolean;

  constructor(config?: IRadioGroupConfig) {
    super();
    this.className = 'RadioGroup';
    this.addAttrName('radio-group');
    this.value = '';
    this.childNodes = [];
    this.setConfig(config);
  }

  override setConfig(config?: Partial<IRadioGroupConfig>) {
    super.setConfig(config);
    if (config?.options) {
      this.setOptions(config.options);
    }
  }

  setOptions(options: IOptionConfig[]): void {
    this.clearChildren();
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new RadioOption({ parent: this });
      optObj.input.addAttrObj({
        name: 'radio' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false
      });
      if (opt.checked) {
        this.value = opt.value;
      }
      optObj.textNode.setText(opt.label);
      this.addChild(optObj);
    });
  }

  setValue(value: string | number | boolean): void {
    this.value = value;
    // console.error('value is ', value);
    this.childNodes.forEach(opt => {
      if (String(opt.input.attrObj.value) === String(value)) {
        opt.input.setAttrObj({
          checked: true
        });
      } else {
        opt.input.removeAttribute('checked');
      }
    });
  }
}
