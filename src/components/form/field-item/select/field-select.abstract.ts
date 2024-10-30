import { Button, Label } from '@type-dom/framework';
import { Select } from '../../select/select.class';
import { FieldItem } from '../field-item.abstract';
import { itemContentStyle } from '../field-item.style';

export abstract class FieldSelect extends FieldItem {
  abstract reset(value?: string): void;

  childNodes: [Label, Select, Button];
  select: Select;
  mode = 'editor';

  protected constructor(labelText = '控件名称') {
    super(labelText);
    this.select = new Select();
    this.select.style.addObj(Object.assign({}, itemContentStyle));
    this.select.attr.addObj({
      name: 'property-select'
      // type: 'text',
      // placeholder: placeholder,
    });
    if (this.mode === 'read') {
      this.select.attr.addObj({
        disabled: true
      });
    }
    this.childNodes = [this.label, this.select, this.button];
  }

  override setup(): void {
    this.select.addEvents({
      click: (evt) => {
        console.log('this.select.dom click, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      },
      change: (evt) => {
        console.log('this.select.dom change, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      }
    });
  }
}
