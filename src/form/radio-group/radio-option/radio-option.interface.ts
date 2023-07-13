import { ITypeSpan } from 'type-dom.ts';
import { IInput } from 'type-dom.ts/element/html-element/input/input.interface';
import { ITextNode } from 'type-dom.ts/text-node/text-node.interface';

export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption',
  childNodes: [IInput, ITextNode],
}
