import { ITypeSelect } from '@type-dom/framework';
import { ISelectOption } from './option/option.interface';

export interface IFieldSelect extends ITypeSelect {
  className: 'FieldSelect',
  childNodes: ISelectOption[];
}

