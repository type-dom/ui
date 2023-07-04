import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { ITemplate } from './template.interface';

export class Template extends TypeHtml implements ITemplate {
  nodeName: 'template';
  className: 'Template';
  dom: HTMLTemplateElement;
  constructor(public parent: TypeHtml) {
    super('template');
    this.nodeName = 'template';
    this.className = 'Template';
    this.dom = document.createElement(this.nodeName);
  }
}
