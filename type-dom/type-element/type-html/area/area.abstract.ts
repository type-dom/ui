import { TypeHtml } from '../type-html.abstract';
import { ITypeArea } from './area.interface';
export abstract class TypeArea extends TypeHtml implements ITypeArea {
  nodeName: 'area';
  dom: HTMLAreaElement;
  protected constructor() {
    super('area');
    this.nodeName = 'area';
    this.dom = document.createElement(this.nodeName);
  }
}
