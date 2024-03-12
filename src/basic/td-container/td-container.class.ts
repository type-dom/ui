import { TypeElement, TypeSection, XElement } from '@type-dom/framework';
import { ITdContainerConfig } from './td-container.interface';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
export class TdContainer extends TypeSection {
  className: 'TdContainer';
  childNodes: (TdAside | TdHeader | TdMain | TdContainer | TypeElement)[]
  constructor(config?: Partial<ITdContainerConfig>) {
    super();
    this.className = 'TdContainer';
    this.addAttrName('td-container');
    this.addAttrClass('td-container');
    this.addStyleObj({
      display: 'flex',
      flexDirection: 'row', // vertical ===> column
      flex: 1,
      flexBasis: 'auto',
      boxSizing: 'border-box',
      minWidth: 0,
    });
    this.childNodes = [];
    if (config?.vertical) {
      this.addStyleObj({
        flexDirection: 'column'
      });
    }
    this.setConfig(config);
  }
}
