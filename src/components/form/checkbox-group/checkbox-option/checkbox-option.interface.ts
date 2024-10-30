import { ITypeSpan, IInput, ITextNode } from '@type-dom/framework';

export interface ICheckboxOption extends ITypeSpan {
  className: 'CheckboxOption';
  childNodes: [IInput, ITextNode];
}
