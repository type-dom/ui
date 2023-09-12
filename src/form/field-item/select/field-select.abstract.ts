import { fromEvent } from 'rxjs';
import { Button, Label, TypeComponent } from 'type-dom.ts';
import { OfdEditor } from 'ofd-editor/src/ofd-editor';
import { Select } from '../../select/select.class';
import { itemContentStyle, FieldItem } from '../field-item.abstract';
export abstract class FieldSelect extends FieldItem {
  abstract reset(value?: string): void;
  childNodes: [Label, Select, Button];
  select: Select;
  protected constructor(public parent: TypeComponent, labelText = '控件名称') {
    super(labelText);
    this.select = new Select(this);
    this.select.propObj = {
      styleObj: Object.assign({}, itemContentStyle),
      attrObj: {
        name: 'property-select'
        // type: 'text',
        // placeholder: placeholder,
      }
    };
    if (OfdEditor.mode === 'read') {
      this.select.addAttrObj({
        disabled: true,
      });
    }
    this.childNodes = [this.label, this.select, this.button];
    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      // 如果只有一个选项时，监听change，input有问题。
      fromEvent(this.select.dom, 'click').subscribe((evt) => {
        console.log('this.select.dom click, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      }),
      fromEvent(this.select.dom, 'change').subscribe((evt) => {
        console.log('this.select.dom change, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      })
    );
  }
}
