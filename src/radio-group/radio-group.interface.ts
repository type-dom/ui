import { ITypeDiv } from '../../type-dom/type-element/type-html/div/div.interface';
import { IRadioOption } from './radio-option/radio-option.interface';

export interface IRadioGroup extends ITypeDiv {
  className: 'RadioGroup',
  childNodes: IRadioOption[],
}
