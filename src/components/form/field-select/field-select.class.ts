import { TypeSelect, IOptionSet } from '@type-dom/framework';
import { SelectOption } from './option/option.class';
import { IFieldSelect } from './field-select.interface';

export class FieldSelect extends TypeSelect implements IFieldSelect {
  className: 'FieldSelect';
  override childNodes: SelectOption[];
  value?: string | number | boolean;

  constructor() {
    super();
    this.className = 'FieldSelect';
    this.attr.addName('td-select');
    this.childNodes = [];
  }

  setOptions(options: IOptionSet[], value: string | number | boolean): void {
    this.clearChildren();
    const firstOpt = new SelectOption();
    firstOpt.textNode.setText('请选择');
    firstOpt.attr.addObj({
      label: '请选择',
      value: 0
    });
    this.addChild(firstOpt);
    options.forEach((opt) => {
      const optObj = new SelectOption();
      optObj.textNode.setText(opt.label);
      optObj.attr.addObj({
        label: opt.label,
        value: opt.value
      });
      // console.log('opt is ', opt);
      // opt.selected && optObj.addAttribute('selected', true);
      this.addChild(optObj);
    });
    this.childNodes.forEach((optObj) => {
      if (String(optObj.attr.get('value')).trim() === String(value).trim()) {
        optObj.attr.add('selected', true);
      } else {
        // optObj.attr.remove('selected');
      }
    });
    // console.error('this.dom.value is ', this.dom.value);
  }

  resetOptions(options: IOptionSet[], value: string | number | boolean): void {
    this.setOptions(options, value);
    this.mount(); // 需要单独渲染。
    // console.error('this.dom.value is ', this.dom.value);
  }

  override setup(): void {
    this.addEvents({
      click: (evt) => {
        console.log('this.select.dom click, event is ', evt);
        console.log('this.select.dom.value is ', this.dom.value);
        // console.log(this.reset);
        // this.setValue(this.dom.value);
        this.value = this.dom.value;
      },
      change: (evt) => {
        console.log('this.select.dom change, event is ', evt);
        console.log('this.select.dom.value is ', this.dom.value);
        // console.log(this.reset);
        // this.setValue(this.dom.value);
        this.value = this.dom.value;
      }
    });
  }

}
