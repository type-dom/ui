import { UI } from '../../../ui/ui.abstract';
import { ITdForm, ITdFormConfig } from './td-form.interface';
import { formContextKey } from './td-form.const';

/**
 * TdForm类继承自UI抽象类，实现ITdForm接口，用于创建和管理表单。
 * 提交表单时，应该要获取所有子元素 form-item 里的 如 TdInput 这些可输入的组件的值。
 * 表单提交地址也应该是可以配置的。
 */
export class TdForm extends UI implements ITdForm {
  className: 'TdForm';
  override props: ITdFormConfig;
  private model?: object;

  /**
   * 构造函数，初始化表单配置。
   * @param params
   */
  constructor(params: ITdFormConfig = {}) {
    super();
    this.useTag('form');
    this.className = 'TdForm';
    this.attr.addName('td-form');
    this.provide(formContextKey, params); // 要在form-item 中 inject

    if (params.slot) {
      this.slotChild(params.slot);
    }
    if (params?.model) {
      this.model = params.model;
    }
    this.props = this.useParams(params);
  }
}
