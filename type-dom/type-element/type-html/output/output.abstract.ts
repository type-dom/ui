import { TypeHtml } from '../type-html.abstract';
import { ITypeOutput } from './output.interface';
export abstract class TypeOutput extends TypeHtml implements ITypeOutput {
  nodeName: 'output';
  dom: HTMLOutputElement;
  protected constructor() {
    super('output');
    this.nodeName = 'output';
    this.dom = document.createElement(this.nodeName);
  }
}
