import { fromEvent } from 'rxjs';
import { TypeHtml, Button, Input, Label } from 'type-dom.ts';
// import { OfdEditor } from 'ofd-editor/src/ofd-editor';
import { itemContentStyle, FieldItem } from '../field-item.abstract';
export abstract class FieldInput extends FieldItem {
  mode?: string;
  abstract reset(value?: string): void;
  childNodes: [Label, Input, Button];
  content: Input;
  protected constructor(public parent: TypeHtml, labelText = '控件名称', placeholder = '请输入') {
    super(labelText);
    this.content = new Input(this);
    this.content.propObj = {
      styleObj: Object.assign({}, itemContentStyle),
      attrObj: {
        type: 'text',
        placeholder: placeholder,
      }
    };
    if (this.mode === 'read') {
      this.content.addAttrObj({
        disabled: true,
      });
    }
    this.button.addStyleObj({
      // position: 'absolute',
      // right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      // border: 'none',
      display: 'none',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0',
    });
    this.button.textNode.setText('');
    this.childNodes = [this.label, this.content, this.button];
    this.initEvents();
  }
  resetInputPlaceholder(placeholder: string): void {
    this.content.setAttribute('placeholder', placeholder);
  }
  resetInputValue(value: string | number = ''): void {
    this.content.setAttribute('value', value);
    this.content.dom.value = String(value);
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.content.dom, 'input').subscribe(() => {
        // console.log('this.input input, event is ', evt);
        // console.log('this.input.dom.value is ', this.input.dom.value);
        this.reset(this.content.dom.value);
      })
    );
  }
}
