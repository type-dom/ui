import { TypeHtml } from '../type-html.abstract';
import { ITypeMeter } from './meter.interface';
export abstract class TypeMeter extends TypeHtml implements ITypeMeter {
  nodeName: 'meter';
  dom: HTMLMeterElement;
  protected constructor() {
    super('meter');
    this.nodeName = 'meter';
    this.dom = document.createElement(this.nodeName);
  }
}
