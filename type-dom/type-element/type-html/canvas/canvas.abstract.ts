import { TypeHtml } from '../type-html.abstract';
import { ITypeCanvas } from './canvas.interface';
export abstract class TypeCanvas extends TypeHtml implements ITypeCanvas {
  nodeName: 'canvas';
  dom: HTMLCanvasElement;
  protected constructor() {
    super('canvas');
    this.nodeName = 'canvas';
    this.dom = document.createElement(this.nodeName);
  }
}
