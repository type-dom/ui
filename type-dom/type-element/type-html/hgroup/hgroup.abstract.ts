import { TypeHtml } from '../type-html.abstract';
import { ITypeHGroup } from './hgroup.interface';
/**
 * <hgroup> HTML 元素代表文档标题和与标题相关联的内容，它将一个 <h1>–<h6> 元素与一个或多个 <p> 元素组合在一起。
 */
export abstract class TypeHGroup extends TypeHtml implements ITypeHGroup {
  nodeName: 'hgroup';
  dom: HTMLElement;
  protected constructor() {
    super('hgroup');
    this.nodeName = 'hgroup';
    this.dom = document.createElement(this.nodeName);
  }
}
