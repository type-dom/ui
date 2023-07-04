import { IInput } from '../../../type-dom/element/html-element/input/input.interface';
import { ITextNode } from '../../../type-dom/text-node/text-node.interface';
import { ITypeSpan } from '../../../type-dom/type-element/type-html/span/span.interface';

export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption',
  childNodes: [IInput, ITextNode],
}
