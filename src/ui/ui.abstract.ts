import { TypeHtml } from '@type-dom/framework';
import { IUI, IUIConfig } from './ui.interface';

let componentId = 0;

export abstract class UI extends TypeHtml implements IUI {
  nodeName: string;
  dom: HTMLElement;
  componentId: number;

  protected constructor(config?: IUIConfig) {
    super();
    this.componentId = componentId++;
    this.addAttrObj({
      componentId: this.componentId
    });
    if (config?.tag) {
      this.nodeName = config.tag;
    } else {
      this.nodeName = 'div';
    }
    this.dom = document.createElement(this.nodeName.trim());
  }
}
