import { TypeElement, TypeSection } from '@type-dom/framework';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
import { ITdContainer, ContainerProps } from './td-container.interface';

export class TdContainer extends TypeSection implements ITdContainer {
  className: 'TdContainer';
  override props: ContainerProps;
  override childNodes: (
    | TdAside
    | TdHeader
    | TdMain
    | TdContainer
    | TypeElement
  )[];

  constructor(params: ContainerProps = {}) {
    super();
    this.className = 'TdContainer';
    this.childNodes = [];
    this.attr.addObj({
      name: 'td-container',
      class: 'td-container',
    });
    this.style.addObj({
      display: 'flex',
      flexDirection: 'row', // vertical ===> column
      flex: 1,
      flexBasis: 'auto',
      boxSizing: 'border-box',
      minWidth: 0,
    });
    if (params?.vertical) {
      this.style.addObj({
        flexDirection: 'column',
      });
    }
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
