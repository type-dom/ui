import { OptionProps, TypeDiv, TypeHtml } from '@type-dom/framework';
import { CheckboxOption } from './checkbox-option/checkbox-option.class';
import { ICheckboxGroup } from './checkbox-group.interface';

export class CheckboxGroup extends TypeDiv implements ICheckboxGroup {
  className: 'CheckboxGroup';
  override parent?: TypeHtml = undefined;
  override childNodes: CheckboxOption[];
  value: (string | number | boolean)[]; // 应该是个数组
  constructor() {
    super();
    this.className = 'CheckboxGroup';
    this.attr.addName('checkbox-group');
    this.childNodes = [];
    this.value = [];
  }

  setOptions(options: OptionProps[]): void {
    this.clearChildren();
    this.value = [];
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new CheckboxOption();
      optObj.input.attr.addObj({
        name: 'checkbox' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false,
      });
      if (opt.checked) {
        this.value.push(opt.value);
      }
      optObj.textNode?.setText(opt.label);
      this.addChild(optObj);
    });
  }

  setValue(value: string | number | boolean): void {
    // console.error('checkbox group setValue ');
    value = String(value);
    if (value.trim()) {
      // console.error('value is ', value);
      this.value = value.split(',');
      this.childNodes.forEach((optObj) => {
        if (this.value.indexOf(String(optObj.input.attr.get('value'))) !== -1) {
          optObj.input.attr.setObj({
            checked: true,
          });
        } else {
          optObj.input.attr.remove('checked');
        }
      });
    } else {
      // console.error('value is ', value);
      this.childNodes.forEach((optObj) => {
        optObj.input.attr.remove('checked');
      });
    }
  }
}
