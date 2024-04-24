import { ITypeSpan, IInput, ITextNode, ITypeConfig } from '@type-dom/framework';

export interface ICheckboxOption extends ITypeSpan {
  className: 'CheckboxOption',
  childNodes: [IInput, ITextNode],
}
