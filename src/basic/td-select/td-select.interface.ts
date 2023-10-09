import { ITypeSelect } from 'type-dom.ts';
import { ISelectOption } from './option/option.interface';
export interface ITdSelect extends ITypeSelect {
  className: 'TdSelect',
  childNodes: ISelectOption[];
}
