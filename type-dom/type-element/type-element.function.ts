import { ITextNode } from '../text-node/text-node.interface';
import { IStyle } from '../style/style.interface';
import { ITypeAttribute, ITypeElement } from './type-element.interface';
import { TypeElement } from './type-element.abstract';
/**
 * 设置dom的style
 * @param dom
 * @param styleObj
 */
export function setStyles(dom: HTMLElement, styleObj: Partial<IStyle>): void {
  for (const key in styleObj) {
    // console.log('key is ', key);
    if (Object.hasOwnProperty.call(styleObj, key)) {
      (dom.style as any)[key] = styleObj[key as keyof IStyle];
    }
  }
}
/**
 * 设置dom属性
 * @param dom
 * @param attrObj
 */
export function setAttributes(dom: HTMLElement, attrObj: Partial<ITypeAttribute>): void {
  for (const attr in attrObj) {
    if (Object.hasOwnProperty.call(attrObj, attr)) {
      dom.setAttribute(attr, (attrObj as any)[attr]);
    }
  }
}
export function pxToRem(str: string): string {
  // 匹配:20px或: 20px不区分大小写
  const reg = /(\:|: )+(\d)+(px)/gi;
  return str.replace(reg, function (char: string) {
    const x = char.replace(/(\:|: )/, '').replace(/px/i, '');
    return ':' + parseFloat(x) / 100 + 'rem';
  });
}
export function getScroll(area?: Element): {x: number; y:number} {
  const body = {
    top:
      document.body.scrollTop > 0
        ? document.body.scrollTop
        : document.documentElement.scrollTop,
    left:
      document.body.scrollLeft > 0
        ? document.body.scrollLeft
        : document.documentElement.scrollLeft,
  };
  return {
    y: area && area.scrollTop >= 0 ? area.scrollTop : body.top,
    x: area && area.scrollLeft >= 0 ? area.scrollLeft : body.left,
  };
}
/**
 * 保存数据时使用。
 * 把当前数据层对象转换为 JSON 字面量。
 * 但是就数据层存储而言，是不需要转化page及其子元素的。
 */
export function toJSON(element: TypeElement): ITypeElement {
  return {
    // nodeName: element.nodeName,
    nodeName: element.nodeName,
    className: element.className,
    propObj: {
      styleObj: Object.assign({}, element.styleObj), // 两层。浅拷贝
      attrObj: Object.assign({}, element.attrObj),
    },
    // items, page ----> 不起作用
    childNodes: element.childNodes.map(child => {
      if (child instanceof TypeElement) {
        return toJSON(child);
      } else {
        return {
          className: 'TextNode',
          nodeName: '#text',
          nodeValue: child.nodeValue, // textContent
        } as ITextNode;
      }
    })
  } as ITypeElement;
}
export function humpToMiddleLine(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
