import { ITypeSpan, IInput, ITextNode } from '@type-dom/framework';
export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption',
  childNodes: [IInput, ITextNode],
}
