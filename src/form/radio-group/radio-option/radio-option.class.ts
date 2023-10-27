import { fromEvent } from 'rxjs';
import { Input, TextNode, TypeSpan } from 'type-dom.ts';
import { RadioGroup } from '../radio-group.class';
import { IRadioOption } from './radio-option.interface';

export class RadioOption extends TypeSpan implements IRadioOption {
  className: 'RadioOption';
  public parent?: RadioGroup;
  childNodes: [Input, TextNode];
  input: Input;
  text: TextNode;
  constructor() {
    super();
    this.className = 'RadioOption';
    this.addStyleObj({
      padding: '0 5px',
    });
    this.input = new Input(this);
    this.input.addAttrObj({
      type: 'radio',
      // name: optionConfig.name,
      // label: opt.label,
      // value: opt.value,
      // checked: opt.checked || false
    });
    this.text = new TextNode('');
    this.childNodes = [this.input, this.text];
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.input.dom, 'click').subscribe(() => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom.value);
        if (this.parent) this.parent.value = this.input.dom.value;
      })
    );
  }
}
