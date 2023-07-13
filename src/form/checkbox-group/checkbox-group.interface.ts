import { ITypeDiv } from 'type-dom.ts';
import { ICheckboxOption } from './checkbox-option/checkbox-option.interface';

export interface ICheckboxGroup extends ITypeDiv {
  className: 'CheckboxGroup',
  childNodes: ICheckboxOption[],
}
