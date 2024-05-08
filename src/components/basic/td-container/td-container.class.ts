import { TypeElement } from '@type-dom/framework';
import { ITdContainer, ITdContainerConfig } from './td-container.interface';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
import { UI } from '../../../ui/ui.abstract';

export class TdContainer extends UI implements ITdContainer {
  className: 'TdContainer';
  override childNodes: (TdAside | TdHeader | TdMain | TdContainer | TypeElement)[];

  constructor(config?: ITdContainerConfig) {
    super({ tag: 'section' });
    this.className = 'TdContainer';
    this.addAttrName('td-container');
    this.addAttrClass('td-container');
    this.addStyleObj({
      display: 'flex',
      flexDirection: 'row', // vertical ===> column
      flex: 1,
      flexBasis: 'auto',
      boxSizing: 'border-box',
      minWidth: 0
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
