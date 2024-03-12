import { TypeHtml } from '@type-dom/framework';
import { FieldInput } from '../field-item/input/field-input.abstract';
import { ITdInput, ITdInputConfig } from './td-input.interface';
// 标题属性
export class TdInput extends FieldInput implements ITdInput {
  className: 'TdInput';
  public parent?: TypeHtml;
  constructor(config: Partial<ITdInputConfig>) {
    super(config.labelTitle, config.placeholder);
    console.log('InputItem constructor . ');
    this.className = 'TdInput';
    this.addStyleObj({
      padding: '2px 10px 2px 0',
    });
    this.addAttrName('input-item');
    this.label.addStyleObj({
      fontSize: '16px',
      width: config.labelWidth || '150px',
    });
    this.content.addAttrObj({
      type: config?.type || 'text',
    });
    // todo 有后缀时才需要这样
    // this.content.addStyleObj({
    //   borderRadius: '4px 0 0 4px',
    // });
    if (config.readonly) {
      this.content.addAttrObj({
        disabled: true,
      });
    }
    // this.button.setStyleObj({
    //   display: 'inline-block',
    //   padding: '4px 3px',
    //   fontSize: '14px',
    //   borderRadius: '0 4px 4px 0',
    //   height: '28px'
    // });
    // this.button.setTitle('');
    // console.log('this.dom is ', this.dom);
  }

  reset(value?: string): void {
    // console.log('value is ', value);
    // if (value !== undefined) {
    //   OfdEditor.selectedControl?.resetLabelText(this.content.dom.value);
    //   return;
    // }
    // if (this.styleObj.display === 'none') this.setStyle('display', 'block');
    // if (OfdEditor.selectedControl?.formItem.labelText?.text) {
    //   this.resetInputValue(OfdEditor.selectedControl.formItem.labelText.text);
    // } else {
    //   this.resetInputValue('');
    // }
  }
}
