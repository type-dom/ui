import { TypeElement } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
import { ITdContainer, ITdContainerConfig } from './td-container.interface';

export class TdContainer extends UI implements ITdContainer {
  className: 'TdContainer';
  override props: ITdContainerConfig;
  override childNodes: (
    | TdAside
    | TdHeader
    | TdMain
    | TdContainer
    | TypeElement
    )[];

  constructor(params: ITdContainerConfig = {}) {
    super();
    this.useTag('section');
    this.className = 'TdContainer';
    this.attr.addName('td-container');
    this.attr.addClass('td-container');
    this.style.addObj({
      display: 'flex',
      flexDirection: 'row', // vertical ===> column
      flex: 1,
      flexBasis: 'auto',
      boxSizing: 'border-box',
      minWidth: 0
    });
    this.childNodes = [];
    if (params?.vertical) {
      this.style.addObj({
        flexDirection: 'column'
      });
    }
    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }
}
