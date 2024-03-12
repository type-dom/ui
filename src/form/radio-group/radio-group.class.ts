import { TypeDiv, TypeHtml } from '@type-dom/framework';
import { IOption } from '../checkbox-group/checkbox-option/checkbox-option.interface';
import { RadioOption } from './radio-option/radio-option.class';
import { IRadioGroup } from './radio-group.interface';

export class RadioGroup extends TypeDiv implements IRadioGroup {
  className: 'RadioGroup';
  public parent?: TypeHtml;
  childNodes: RadioOption[];
  value: string | number | boolean;
  constructor() {
    super();
    this.className = 'RadioGroup';
    this.addAttrName('radio-group');
    this.value = '';
    this.childNodes = [];
  }
  setOptions(options: IOption[]): void {
    this.clearChildren();
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new RadioOption();
      optObj.input.addAttrObj({
        name: 'radio' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false
      });
      if (opt.checked) {
        this.value = opt.value;
      }
      optObj.text.setText(opt.label);
      this.addChild(optObj);
    });
  }
  setValue(value: string | number | boolean): void {
    this.value = value;
    // console.error('value is ', value);
    this.childNodes.forEach(opt => {
      if (String(opt.input.attrObj.value) === String(value)) {
        opt.input.setAttrObj({
          checked: true,
        });
      } else {
        opt.input.removeAttribute('checked');
      }
    });
  }
}
