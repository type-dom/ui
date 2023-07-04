import { ITypeDiv } from '../type-element/type-html/div/div.interface';
export interface IRoot extends ITypeDiv {
  className: 'Root',
  parent: IRoot;
}
