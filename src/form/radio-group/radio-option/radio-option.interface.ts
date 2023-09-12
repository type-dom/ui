import { ITypeSpan, IInput, ITextNode } from 'type-dom.ts';
export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption',
  childNodes: [IInput, ITextNode],
}
