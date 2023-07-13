import {ITypeSpan} from "type-dom.ts";
import {IInput} from "type-dom.ts/element/html-element/input/input.interface";
import {ITextNode} from "type-dom.ts/text-node/text-node.interface";

export interface ICheckboxOption extends ITypeSpan {
  className: 'CheckboxOption',
  childNodes: [IInput, ITextNode],
}
export interface IOption {
  label: string,
  value: string,
  checked: boolean,
}
