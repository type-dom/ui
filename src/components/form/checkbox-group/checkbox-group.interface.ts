import { ITypeDiv } from '@type-dom/framework';
import { ICheckboxOption } from './checkbox-option/checkbox-option.interface';

export interface ICheckboxGroup extends ITypeDiv {
  className: 'CheckboxGroup';
  childNodes: ICheckboxOption[];
}
