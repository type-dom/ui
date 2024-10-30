import { Label, Textarea, Button } from '@type-dom/framework';
import { FieldItem } from '../field-item.abstract';
import { labelStyle } from '../field-item.style';

export abstract class FieldTextarea extends FieldItem {
  // abstract reset(value?: string): void;
  childNodes: [Label, Textarea, Button];
  content: Textarea;
  mode = 'edit';

  protected constructor(labelText = '控件名称', placeholder = '请输入') {
    super(labelText);
    this.style.addObj({
      display: 'block', // 不是 flex
      marginBottom: '20px'
    });
    this.content = new Textarea({
      parent: this,
      styleObj: {
        height: '100%',
        minHeight: '80px',
        // lineHeight: '32px',
        textAlign: 'left',
        backgroundColor: '#FFF',
        backgroundImage: 'none',
        borderRadius: '4px',
        border: '1px solid #DCDFE6',
        // -webkit-box-sizing: border-box;
        boxSizing: 'border-box',
        color: '#606266',
        display: 'inlineBlock',
        outline: '0',
        padding: '0 5px',
        // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
        width: 'calc(100% - ' + labelStyle.width + ')'
      },
      attrObj: {
        placeholder: placeholder
      }
    });
    console.log('this.parent is ', this.parent);
    console.log('this.mode is ', this.mode);
    if (this.mode === 'read') {
      this.content.attr.addObj({
        disabled: true
      });
    }
    this.button.textNode.setText('确定');
    this.button.style.addObj({
      height: '24px',
      float: 'right',
      display: 'block'
    });
    this.childNodes = [this.label, this.content, this.button];
  }

  resetInputPlaceholder(placeholder: string): void {
    this.content.attr.set('placeholder', placeholder);
  }

  resetInputValue(value = ''): void {
    this.content.attr.set('value', value);
    this.content.dom.value = String(value);
  }

  // initEvents(): void {
  //     fromEvent(this.content.dom, 'input').subscribe(() => {
  //       // console.log('this.input input, event is ', evt);
  //       // console.log('this.input.dom.value is ', this.input.dom.value);
  //       if (this.mode === 'edit') {
  //         this.reset(this.content.dom.value);
  //       }
  //     }),
  // }
}
