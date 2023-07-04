import { ITypeButton } from '../../../type-element/type-html/button/button.interface';
import { ITypeNode } from '../../../type-node/type-node.interface';
export interface IButton extends ITypeButton {
  className: 'Button',
  childNodes: ITypeNode[],
}
