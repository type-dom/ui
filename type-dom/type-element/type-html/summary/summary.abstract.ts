import { TypeHtml } from '../type-html.abstract';
import { ITypeSummary } from './summary.interface';
export abstract class TypeSummary extends TypeHtml implements ITypeSummary {
  nodeName: 'summary';
  dom: HTMLElement;
  protected constructor() {
    super('summary');
    this.nodeName = 'summary';
    this.dom = document.createElement(this.nodeName);
  }
}
