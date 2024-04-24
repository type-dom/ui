import { fromEvent } from 'rxjs';
import { Input, TextNode, TypeSpan } from '@type-dom/framework';
import { RadioGroup } from '../radio-group.class';
import { IRadioOption, IRadioOptionConfig } from './radio-option.interface';

export class RadioOption extends TypeSpan implements IRadioOption {
  className: 'RadioOption';
  input: Input;
  override parent?: RadioGroup;
  override childNodes: [Input, TextNode];
  override textNode: TextNode;

  constructor(config?: IRadioOptionConfig) {
    super();
    this.className = 'RadioOption';
    this.addStyleObj({
      padding: '0 5px'
    });
    this.input = new Input({ parent: this });
    this.input.addAttrObj({
      type: 'radio'
      // name: optionSetting.name,
      // label: opt.label,
      // value: opt.value,
      // checked: opt.checked || false
    });
    this.textNode = new TextNode('');
    this.childNodes = [this.input, this.textNode];
    this.setConfig(config);
  }

  override setConfig(config?: IRadioOptionConfig): void {
    super.setConfig(config);
    if (config?.name) {
      this.input.addAttrName(config.name);
    }
    if (config?.value) {
      this.input.addAttrObj({ value: config.value });
    }
    if (config?.checked) {
      this.input.addAttrObj({ checked: config.checked || false });
    }
  }

  override initEvents(): void {
    this.subscriptions.push(
      fromEvent(this.input.dom, 'click').subscribe(() => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom.value);
        if (this.parent) this.parent.value = this.input.dom.value;
      })
    );
  }
}
