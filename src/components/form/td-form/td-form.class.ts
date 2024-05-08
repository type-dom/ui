import { UI } from '../../../ui/ui.abstract';
import { ITdForm, ITdFormConfig } from './td-form.interface';
import { TdFormItem } from '../td-form-item/td-form-item.class';

/**
 * TdForm类继承自UI抽象类，实现ITdForm接口，用于创建和管理表单。
 * 提交表单时，应该要获取所有子元素 form-item 里的 如 TdInput 这些可输入的组件的值。
 * 表单提交地址也应该是可以配置的。
 */
export class TdForm extends UI implements ITdForm {
  className: 'TdForm';
  override config?: ITdFormConfig;
  private model?: object;

  /**
   * 构造函数，初始化表单配置。
   * @param {ITdFormConfig} config? 可选的表单配置对象。
   */
  constructor(config?: ITdFormConfig) {
    super({ tag: 'form' });
    this.className = 'TdForm';
    this.addAttrName('td-form');
    this.setConfig(config);
  }

  /**
   * 设置表单配置，包括模型和样式配置，并应用到子元素。
   * @param {ITdFormConfig} config? 可选的表单配置对象。
   */
  override setConfig(config?: ITdFormConfig) {
    super.setConfig(config);
    // 应用模型数据
    if (config?.model) {
      this.model = config.model;
    }
    // 待实现：设置子元素的labelWidth
    if (config?.labelWidth) {
      //   todo 设置子元素的labelWidth
    }
    // 遍历子元素，应用样式和配置
    this.children.forEach((child) => {
      if (child instanceof TdFormItem) {
        child.addStyleObj({
          display: this.config?.inline ? 'inline-flex' : 'flex',
          verticalAlign: 'middle',
          marginRight:  this.config?.inline ? '32px' : child.styleObj?.marginRight,
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
