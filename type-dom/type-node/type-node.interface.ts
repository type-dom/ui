import { ITypeProperty } from '../type-element/type-element.interface';
export interface INodeAttr {
  name: string,
  value: string;
}
export interface IPath {
  name: string,
  pos: number,
}
/**
 * json格式的接口，也是json存储的数据结构
 */
export interface ITypeNode {
  nodeName?: string,
  className?: string,
  TypeClass?: any, // todo 如何设置？？？ 这个不会转为json
  // propObj与attributes应该可以相互转换，而且都是只在TypeElement和XNode中有。
  // TextNode 没有 attributes和propObj
  propObj?: ITypeProperty;
  // nodeValue只在 TextNode中才有。
  nodeValue?: string,
  parent?: ITypeNode,
  // TextNode 没有 childNodes
  childNodes?: ITypeNode[],
  // attributes?: INodeAttr[];
  // 绑定的事件集合, TypeElement 才有
  // 生成json时，基于events生成；
  // 反向转为类时，要转为events的值
  on?: Record<string, string>,
  config?: Record<string, any>, // config不会转为json
}
