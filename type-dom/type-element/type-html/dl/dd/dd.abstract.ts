import { TypeHtml } from '../../type-html.abstract';
import { ITypeDD } from './dd.interface';
/**
 * 定义描述（definition description）
 * <dd> 元素（HTML 描述元素）用来指明一个描述列表 (<dl>) 元素中一个术语的描述。这个元素只能作为描述列表元素的子元素出现，并且必须跟着一个 <dt> 元素。
 */
export abstract class TypeDD extends TypeHtml implements ITypeDD {
  nodeName: 'dd';
  dom: HTMLElement;
  protected constructor() {
    super('dd');
    this.nodeName = 'dd';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
