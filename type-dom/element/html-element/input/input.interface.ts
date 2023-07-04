import { ITypeAttribute, ITypeElement } from '../../../type-element/type-element.interface';
import { InputEnum } from './input.enum';
export interface IInputAttribute extends ITypeAttribute {
  type: keyof typeof InputEnum,
}
export interface IInput extends ITypeElement {
  nodeName: 'input',
  className: 'Input',
  childNodes: [],
}
