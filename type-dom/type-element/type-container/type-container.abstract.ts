import { TypeElement } from '../type-element.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeDiv } from '../type-html/div/div.abstract';
import { ITypeContainer } from './type-container.interface';
/**
 * 组件基类
 * 子节点是 TypeElement, 不包括 TextNode
 */
export abstract class TypeContainer extends TypeDiv implements ITypeContainer {
  abstract parent: TypeHtml;
  childNodes: TypeElement[];  // 没有TextNode
  protected constructor() {
    super();
    this.childNodes = [];
  }

  get firstChild(): TypeElement {
    return this.childNodes[0];
  }

  get lastChild(): TypeElement {
    return this.childNodes[this.length - 1];
  }

  findChildAtIndex(index: number): TypeElement | null {
    return this.childNodes[index] || null;
  }

  findChildIndex(child: TypeElement): number {
    return this.childNodes.findIndex(item => item === child);
  }
}
