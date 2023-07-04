import { ITypeHtml } from '../../../../type-element/type-html/type-html.interface';
export interface ISelectOption extends ITypeHtml {
  nodeName: 'option',
  className: 'SelectOption',
  // childNodes: ITypNode[],
}
