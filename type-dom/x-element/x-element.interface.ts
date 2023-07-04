import { ITypeElement, ITypeProperty } from '../type-element/type-element.interface';
export interface IXElement extends ITypeElement {
  className: 'XElement',
  propObj: ITypeProperty;
}
