import {TypeHtml, TypeSection, XElement} from 'type-dom.ts';
import {ITdContainerConfig} from "./td-container.interface";

export class TdContainerClass extends TypeSection {
  className: 'TdContainer';
  parent?:  TypeHtml | XElement;
  constructor(config: ITdContainerConfig) {
    super();
    this.className = 'TdContainer';
  }
}
