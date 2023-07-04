import { TypeHtml } from '../../type-html.abstract';
import { ITypeDT } from './dt.interface';
/**
 * 定义术语（definition term）
 * <dt> 元素 （或 HTML 术语定义元素）用于在一个定义列表中声明一个术语。该元素仅能作为 <dl> 的子元素出现。通常在该元素后面会跟着 <dd> 元素，然而，多个连续出现的 <dt> 元素都将由出现在它们后面的第一个 <dd> 元素定义。
 */
export abstract class TypeDT extends TypeHtml implements ITypeDT {
  nodeName: 'dt';
  dom: HTMLElement;
  protected constructor() {
    super('dt');
    this.nodeName = 'dt';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
