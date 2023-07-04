import { TypeHtml } from '../type-html.abstract';
import { ITypeDL } from './dl.interface';
/**
 * 定义列表（definition list）
 * <dl> 元素 （或 HTML 描述列表元素）是一个包含术语定义以及描述的列表，通常用于展示词汇表或者元数据 (键 - 值对列表)。
 */
export abstract class TypeDL extends TypeHtml implements ITypeDL {
  nodeName: 'dl';
  dom: HTMLDListElement;
  // childNodes: (TypeLI | TypeUL)[];
  // type, start 在属性中单独配置，不需要在构造函数中传参
  protected constructor() {
    super('dl');
    this.nodeName = 'dl';
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
