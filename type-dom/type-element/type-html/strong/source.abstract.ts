import { TypeHtml } from '../type-html.abstract';
import { ITypeSource } from './source.interface';
export abstract class TypeSource extends TypeHtml implements ITypeSource {
  nodeName: 'source';
  dom: HTMLSourceElement;
  protected constructor() {
    super('source');
    this.nodeName = 'source';
    this.dom = document.createElement(this.nodeName);
  }
}
