import { fromEvent } from 'rxjs';
import { Input } from '../../../type-dom/element/html-element/input/input.class';
import { TypeSpan } from '../../../type-dom/type-element/type-html/span/span.abstract';
import { TextNode } from '../../../type-dom/text-node/text-node.class';
import { RadioGroup } from '../radio-group.class';
import { IRadioOption } from './radio-option.interface';

export class RadioOption extends TypeSpan implements IRadioOption {
  className: 'RadioOption';
  childNodes: [Input, TextNode];
  input: Input;
  text: TextNode;
  constructor(public parent: RadioGroup) {
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
    this.text = new TextNode(this, '');
    this.childNodes = [this.input, this.text];
    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.input.dom, 'click').subscribe(() => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom.value);
        this.parent.value = this.input.dom.value;
      })
    );
  }
}
