import { IOptionConfig, ITypeConfig, ITypeDiv } from '@type-dom/framework';
import { IRadioOption } from './radio-option/radio-option.interface';

export interface IRadioGroup extends ITypeDiv {
  className: 'RadioGroup';
  childNodes: IRadioOption[];
}

export interface IRadioGroupConfig extends ITypeConfig {
  name?: string;
  options?: IOptionConfig[];
  value?: string | number;
}
