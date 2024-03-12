import { ITypeDiv } from '@type-dom/framework';
import { IRadioOption } from './radio-option/radio-option.interface';

export interface IRadioGroup extends ITypeDiv {
  className: 'RadioGroup',
  childNodes: IRadioOption[],
}
