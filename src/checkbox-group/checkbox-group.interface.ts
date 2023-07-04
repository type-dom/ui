import { ITypeDiv } from '../../type-dom/type-element/type-html/div/div.interface';
import { ICheckboxOption } from './checkbox-option/checkbox-option.interface';

export interface ICheckboxGroup extends ITypeDiv {
  className: 'CheckboxGroup',
  childNodes: ICheckboxOption[],
}
