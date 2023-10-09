import { ITypeOption } from 'type-dom.ts';
export interface ISelectOption extends ITypeOption {
  nodeName: 'option',
  className: 'SelectOption',
  // childNodes: ITypNode[],
}
