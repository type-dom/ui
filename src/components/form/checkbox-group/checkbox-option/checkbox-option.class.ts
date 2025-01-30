import { Input, TextNode, TypeSpan } from '@type-dom/framework';
import { CheckboxGroup } from '../checkbox-group.class';
import { ICheckboxOption } from './checkbox-option.interface';

export class CheckboxOption extends TypeSpan implements ICheckboxOption {
  className: 'CheckboxOption';
  input: Input;
  override parent?: CheckboxGroup;
  override childNodes: [Input, TextNode];

  constructor() {
    super();
    this.className = 'CheckboxOption';
    this.input = new Input({ parent: this });
    this.input.attr.addObj({
      type: 'checkbox',
      // name: optionSetting.name,
      // label: opt.label,
      // value: opt.value,
      // checked: opt.checked || false
    });
    this.childNodes = [this.input, new TextNode()];
  }

  override setup(): void {
    this.input.addEvents({
      click: () => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom?.value);
        const flag = this.parent?.value.findIndex(
          (item) => item === this.input.dom?.value
        );
        if (this.input.dom?.checked) {
          if (flag === -1) {
            this.parent?.value.push(this.input.dom?.value);
            this.input.attr.setObj({
              checked: true,
            });
          }
        } else {
          this.input.attr.remove('checked');
          if (flag && flag !== -1) {
            this.parent?.value && this.parent?.value.splice(flag, 1);
          }
        }
      },
    });
  }
}
