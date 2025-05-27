import { TypeForm } from '@type-dom/framework';
import { ITdForm, FormProps } from './td-form.interface';
import { formEmits } from './td-form.const';
import { TdFormItem } from '../td-form-item/td-form-item.class';

/**
 * TdForm类继承自UI抽象类，实现ITdForm接口，用于创建和管理表单。
 * 提交表单时，应该要获取所有子元素 form-item 里的 如 TdInput 这些可输入的组件的值。
 * 表单提交地址也应该是可以配置的。
 */
export class TdForm extends TypeForm implements ITdForm {
  className: 'TdForm';
  override childNodes: TdFormItem[];
  override props: FormProps;
  model?: object;

  /**
   * 构造函数，初始化表单配置。
   * @param params
   */
  constructor(params: FormProps = {}) {
    super();
    // this.useTag('form');
    this.className = 'TdForm';
    this.attr.addObj({
      name: 'td-form',
    });
    this.childNodes = [];

    if (params.slot) {
      this.slotChildren(params.slot);
    }
    if (params?.model) {
      this.model = params.model;
    }
    this.props = this.useParams(params);
    // this.provide(formContextKey, params); // 要在form-item 中 inject
    this.addEmits(formEmits);
  }
}
