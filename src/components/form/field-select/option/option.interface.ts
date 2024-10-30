import { ITypeOption } from '@type-dom/framework';

export interface ISelectOption extends ITypeOption {
  nodeName: 'option';
  className: 'SelectOption';
  // childNodes: ITypNode[],
}
