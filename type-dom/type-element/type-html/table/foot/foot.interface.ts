import { ITypeElement } from '../../../type-element.interface';
import { ITypeTableRow } from '../row/row.interface';
export interface ITypeTableFoot extends ITypeElement {
  nodeName: 'tfoot',
  childNodes: ITypeTableRow[],
}
