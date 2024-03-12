import { ITypeSelect } from '@type-dom/framework';
import { ISelectOption } from './option/option.interface';
export interface ITdSelect extends ITypeSelect {
  className: 'TdSelect',
  childNodes: ISelectOption[];
}
