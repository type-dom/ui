import { fromEvent } from 'rxjs';
import { Input, TextNode, TypeSpan } from '@type-dom/framework';
import { CheckboxGroup } from '../checkbox-group.class';
import { ICheckboxOption } from './checkbox-option.interface';

export class CheckboxOption extends TypeSpan implements ICheckboxOption {
  className: 'CheckboxOption';
  input: Input;
  override parent?: CheckboxGroup;
  override childNodes: [Input, TextNode];
  override textNode: TextNode;

  constructor() {
    super();
    this.className = 'CheckboxOption';
    this.input = new Input({ parent: this });
    this.input.addAttrObj({
      type: 'checkbox'
      // name: optionSetting.name,
      // label: opt.label,
      // value: opt.value,
      // checked: opt.checked || false
    });
    this.textNode = new TextNode();
    this.childNodes = [this.input, this.textNode];
  }

  override initEvents(): void {
    this.subscriptions.push(
      fromEvent(this.input.dom, 'click').subscribe(() => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom.value);
        const flag = this.parent?.value.findIndex(
          (item) => item === this.input.dom.value
        );
        if (this.input.dom.checked) {
          if (flag === -1) {
            this.parent?.value.push(this.input.dom.value);
            this.input.setAttrObj({
              checked: true
            });
          }
        } else {
          this.input.removeAttribute('checked');
          if (flag && flag !== -1) {
            this.parent?.value.splice(flag, 1);
          }
        }
      })
    );
  }
}
