/**
 * 文本节点字面量
 * @author xjf
 * @date 2023/6/18 18:06
  */
import { ITypeNode } from '../type-node/type-node.interface';
export interface ITextNode extends ITypeNode {
  className: 'TextNode';
  nodeValue: string;
  // text: string;
}
