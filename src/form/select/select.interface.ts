import { ITypeSelect } from '@type-dom/framework';
import { IOption } from '../field-item/field-item.interface';
export interface ISelect extends ITypeSelect {
  className: 'Select',
}
export interface IOptionConfig {
  name: string,
  // selectedOption: string | number | boolean,
  resultValue: string | number | boolean, // 不应该根据这个排队选中后的值，因为有可能是多选。
  options: IOption[]
}
