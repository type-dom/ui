import { ITypeSpan, IInput, ITextNode, ITypeConfig } from '@type-dom/framework';

export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption';
  childNodes: [IInput, ITextNode];
}

export interface IRadioOptionConfig extends ITypeConfig {
  value?: string | number;
  name?: string;
  checked?: boolean;
}
