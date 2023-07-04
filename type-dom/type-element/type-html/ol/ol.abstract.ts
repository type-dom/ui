import { TypeHtml } from '../type-html.abstract';
import { ITypeOL } from './ol.interface';
import { TypeLI } from '../ul/li/li.class';
import { TypeUL } from '../ul/ul.abstract';
/**
 * 有序列表，ordered list
 * HTML <ol> 元素表示有序列表，通常渲染为一个带编号的列表
 * type 设置编号的类型：
 *    a 表示小写英文字母编号
 *    A 表示大写英文字母编号
 *    i 表示小写罗马数字编号
 *    I 表示大写罗马数字编号
 *    1 表示数字编号（默认）编号类型适用于整个列表，除非在 <ol> 元素的 <li> 元素中使用不同的 type 属性。
 */
export abstract class TypeOL extends TypeHtml implements ITypeOL {
  nodeName: 'ol';
  dom: HTMLOListElement;
  childNodes: (TypeLI | TypeUL)[];
  // type, start 在属性中单独配置，不需要在构造函数中传参
  protected constructor() {
    super('ol');
    this.nodeName = 'ol';
    this.dom = document.createElement(this.nodeName);
    // this.propObj.attrObj.type = type;
    // this.propObj.attrObj.start = start;
    // this.addAttrObj({
    //   type,
    //   start,
    // });
    this.childNodes = [];
  }
}
