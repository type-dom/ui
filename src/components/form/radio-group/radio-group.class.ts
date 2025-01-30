import { OptionProps, TypeDiv } from '@type-dom/framework';
import { RadioOption } from './radio-option/radio-option.class';
import { IRadioGroup, RadioGroupProps } from './radio-group.interface';

export class RadioGroup extends TypeDiv implements IRadioGroup {
  className: 'RadioGroup';
  override props: RadioGroupProps;
  override childNodes: RadioOption[];
  value?: string | number | boolean;

  constructor(params: RadioGroupProps = {}) {
    super();
    this.className = 'RadioGroup';
    this.attr.addName('radio-group');
    this.value = '';
    this.childNodes = [];
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props?.options) {
      this.setOptions(props.options);
    }
  }

  setOptions(options: OptionProps[]): void {
    this.clearChildren();
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new RadioOption({ parent: this });
      optObj.input.attr.addObj({
        name: 'radio' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false,
      });
      if (opt.checked) {
        this.value = opt.value;
      }
      optObj.textNode?.setText(opt.label);
      this.addChild(optObj);
    });
  }

  setValue(value: string | number | boolean): void {
    this.value = value;
    // console.error('value is ', value);
    this.childNodes.forEach((opt) => {
      if (String(opt.input.attr.get('value')) === String(value)) {
        opt.input.attr.setObj({
          checked: true,
        });
      } else {
        opt.input.attr.remove('checked');
      }
    });
  }
}
