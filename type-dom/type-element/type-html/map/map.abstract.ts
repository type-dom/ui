import { TypeHtml } from '../type-html.abstract';
import { ITypeMap } from './map.interface';
export abstract class TypeMap extends TypeHtml implements ITypeMap {
  nodeName: 'map';
  dom: HTMLMapElement;
  protected constructor() {
    super('map');
    this.nodeName = 'map';
    this.dom = document.createElement(this.nodeName);
  }
}
