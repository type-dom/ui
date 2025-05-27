import { Input, TextNode, TypeSpan } from '@type-dom/framework';
import { RadioGroup } from '../radio-group.class';
import { IRadioOption, IRadioOptionConfig } from './radio-option.interface';

export class RadioOption extends TypeSpan implements IRadioOption {
  className: 'RadioOption';
  override props: IRadioOptionConfig;
  input: Input;
  override parent?: RadioGroup = undefined;
  override childNodes: [Input, TextNode];

  constructor(params: IRadioOptionConfig = {}) {
    super();
    this.className = 'RadioOption';
    this.style.addObj({
      padding: '0 5px',
    });
    this.input = new Input({ parent: this });
    this.input.attr.addObj({
      type: 'radio',
      // name: optionSetting.name,
      // label: opt.label,
      // value: opt.value,
      // checked: opt.checked || false
    });
    this.childNodes = [this.input, new TextNode('')];
    this.props = this.useParams(params);
  }

  override setup(config?: IRadioOptionConfig): void {
    if (config?.name) {
      this.input.attr.addName(config.name);
    }
    if (config?.value) {
      this.input.attr.addObj({ value: config.value });
    }
    if (config?.checked) {
      this.input.attr.addObj({ checked: config.checked || false });
    }
    this.input.addEvents({
      click: () => {
        console.log('this.input.dom click . ');
        console.log('this.input.dom.value is ', this.input.dom?.value);
        if (this.parent) this.parent.value = this.input.dom?.value;
      },
    });
  }
}
