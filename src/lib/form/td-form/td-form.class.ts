import { UI } from '../../ui.abstract';
import { ITdForm, ITdFormConfig } from './td-form.interface';
import { TdFormItem } from '../td-form-item/td-form-item.class';

export class TdForm extends UI implements ITdForm {
  className: 'TdForm';
  override config?: ITdFormConfig;
  private model?: object;

  constructor(config?: ITdFormConfig) {
    super({ tag: 'form' });
    this.className = 'TdForm';
    this.addAttrName('td-form');
    this.setConfig(config);
  }

  override setConfig(config?: ITdFormConfig) {
    super.setConfig(config);
    if (config?.model) {
      this.model = config.model;
    }
    if (config?.labelWidth) {
      //   todo 设置子元素的labelWidth
    }
    this.children.forEach((child) => {
      if (child instanceof TdFormItem) {
        child.addStyleObj({
          display: this.config?.inline ? 'inline-flex' : 'flex',
          verticalAlign: 'middle',
          marginRight: '32px'
          // justifyContent: justifyContent,
        });
        child.setLabelPosition(this.config?.labelPosition);
        child.setSize(this.config?.size);
      }
    });
  }

  // override created() {
  //   console.log('TdForm created');
  //   this.children.forEach((child) => {
  //     if (child instanceof TdFormItem) {
  //       const justifyContent = this.config?.labelPosition === 'left' ? 'flex-start' : 'flex-end';
  //       console.log('justifyContent', justifyContent);
  //       child.addStyleObj({
  //         display: this.config?.inline ? 'inline-flex' : 'inline-flex',
  //         verticalAlign: 'middle',
  //         marginRight: '32px',
  //         justifyContent,
  //       });
  //     }
  //   });
  // }
}
