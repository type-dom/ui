import { Input, Label, Button } from '@type-dom/framework';
import { FieldItem } from '../field-item.abstract';
import { itemContentStyle } from '../field-item.style';

export abstract class FieldInput extends FieldItem {
  mode?: string;

  abstract reset(value?: string): void;

  childNodes: [Label, Input, Button];
  content: Input;

  protected constructor(labelText = '控件名称', placeholder = '请输入') {
    super(labelText);
    this.content = new Input({ parent: this });
    this.content.style.addObj(itemContentStyle);
    this.content.attr.addObj({
      type: 'text',
      placeholder: placeholder,
    });
    if (this.mode === 'read') {
      this.content.attr.addObj({
        disabled: true,
      });
    }
    // this.button.style.addObj({
    //   // position: 'absolute',
    //   // right: '10px',
    //   padding: '8px 3px 4px',
    //   fontSize: '16px',
    //   // border: 'none',
    //   display: 'none',
    //   border: '1px solid #DCDFE6',
    //   borderRadius: '0 4px 4px 0',
    // });
    this.button.textNode?.setText('');
    this.childNodes = [this.label, this.content, this.button];
  }

  resetInputPlaceholder(placeholder: string): void {
    this.content.attr.set('placeholder', placeholder);
  }

  resetInputValue(value: string | number = ''): void {
    this.content.attr.set('value', value);
    this.content.dom!.value = String(value);
  }

  override setup(): void {
    this.content.addEvents({
      input: () => {
        // console.log('this.input input, event is ', evt);
        // console.log('this.input.dom.value is ', this.input.dom.value);
        this.reset(this.content.dom?.value);
      },
    });
  }
}
