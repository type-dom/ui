import { OptionProps, ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { IRadioOption } from './radio-option/radio-option.interface';

export interface IRadioGroup extends ITypeDiv {
  className: 'RadioGroup';
  childNodes: IRadioOption[];
}

export interface RadioGroupProps extends TypeDivProps {
  name?: string;
  options?: OptionProps[];
  value?: string | number;
}
