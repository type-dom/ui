/**
 * 虚拟dom的数据结构字面量接口。
 */
import { ITypeNode } from '../type-node/type-node.interface';
import { IStyle } from '../style/style.interface';
export interface ITypeAttribute {
  // id?: string;
  class?: string,
  name?: string,
  type?: string,
  start?: string,
  [key: string]: string | number | boolean | unknown | undefined;
}
export interface ITypeProperty {
  attrObj: Partial<ITypeAttribute>;
  styleObj: Partial<IStyle>;
  classes?: string[];
}
/**
 * 虚拟 DOM 节点的 *字面量* 表示。
 */
export interface ITypeElement extends ITypeNode {
  className: string; // todo enum ??
  propObj: ITypeProperty;
  childNodes: Array<ITypeNode>;// contents
}
export interface IBoundBox {
  top: number;
  left: number;
  width: number;
  height: number;
}
