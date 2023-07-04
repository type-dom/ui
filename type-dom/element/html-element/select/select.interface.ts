import { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { ISelectOption } from './option/option.interface';

export interface ISelect extends ITypeHtml {
  className: 'Select',
  childNodes: ISelectOption[];
}
export interface IOption {
  label: string,
  value: string,
}
