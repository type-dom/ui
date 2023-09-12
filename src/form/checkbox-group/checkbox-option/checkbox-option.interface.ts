import {ITypeSpan, IInput, ITextNode} from "type-dom.ts";
export interface ICheckboxOption extends ITypeSpan {
  className: 'CheckboxOption',
  childNodes: [IInput, ITextNode],
}
export interface IOption {
  label: string,
  value: string,
  checked: boolean,
}
