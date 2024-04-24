import { IButton, ILabel, ITypeNode } from '@type-dom/framework';

export interface IFieldItem extends ITypeNode {
  label: ILabel;
  button: IButton;
}
