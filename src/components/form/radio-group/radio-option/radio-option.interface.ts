import {
  ITypeSpan,
  IInput,
  ITextNode,
  TypeSpanProps,
} from '@type-dom/framework';

export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption';
  childNodes: [IInput, ITextNode];
}

export interface IRadioOptionConfig extends TypeSpanProps {
  value?: string | number;
  name?: string;
  checked?: boolean;
}
