
import { TypeDiv, TypeHtml } from '@type-dom/framework';
import { CheckboxOption } from './checkbox-option/checkbox-option.class';
import { ICheckboxGroup } from './checkbox-group.interface';
import { IOption } from './checkbox-option/checkbox-option.interface';

export class CheckboxGroup extends TypeDiv implements ICheckboxGroup {
  className: 'CheckboxGroup';
  public parent?: TypeHtml;
  childNodes: CheckboxOption[];
  value: (string | number | boolean)[]; // 应该是个数组
  constructor() {
    super();
    this.className = 'CheckboxGroup';
    this.addAttrName('checkbox-group');
    this.childNodes = [];
    this.value = [];
  }
  setOptions(options: IOption[]): void {
    this.clearChildren();
    this.value = [];
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new CheckboxOption();
      optObj.input.addAttrObj({
        name: 'checkbox' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false
      });
      if (opt.checked) {
        this.value.push(opt.value);
      }
      optObj.text.setText(opt.label);
      this.addChild(optObj);
    });
  }
  setValue(value: string | number | boolean): void {
    // console.error('checkbox group setValue ');
    value = String(value);
    if (value.trim()) {
      // console.error('value is ', value);
      this.value = value.split(',');
      this.childNodes.forEach(optObj => {
        if (this.value.indexOf(String(optObj.input.attrObj.value)) !== -1) {
          optObj.input.setAttrObj({
            checked: true,
          });
        } else {
          optObj.input.removeAttribute('checked');
        }
      });
    } else {
      // console.error('value is ', value);
      this.childNodes.forEach(optObj => {
        optObj.input.removeAttribute('checked');
      });
    }
  }
}
