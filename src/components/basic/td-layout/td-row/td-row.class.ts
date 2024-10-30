import { UI } from '../../../../ui/ui.abstract';
import { TdCol } from '../td-col/td-col.class';
import { ITdRow, ITdRowConfig } from './td-row.interface';

export class TdRow extends UI implements ITdRow {
  className: 'TdRow';
  override props: ITdRowConfig;
  override childNodes: TdCol[];
  gutter?: number;
  // justify: string = 'start';
  // align: string = 'top';
  // tag: string = 'div';
  constructor(params: ITdRowConfig = {}) {
    super();
    this.className = 'TdRow';
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      boxSizing: 'border-box'
    });
    this.childNodes = [];
    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props?.gutter) {
      this.gutter = props.gutter;
      this.style.addObj({
        marginLeft: `-${props.gutter / 2}px`,
        marginRight: `-${props.gutter / 2}px`
      });
      this.children.forEach((child) => {
        if (child instanceof TdCol) {
          if (props.gutter) {
            child.style.addObj({
              boxSizing: 'border-box',
              paddingLeft: `${props.gutter / 2}px`,
              paddingRight: `${props.gutter / 2}px`
            });
          }
        }
      });
    }
    if (props?.justify) {
      // this.setJustify(props.justify);
      switch (props.justify) {
        case 'center':
          this.style.addObj({
            justifyContent: 'center'
          });
          break;
        case 'end':
          this.style.addObj({
            justifyContent: 'flex-end'
          });
          break;
        case 'space-between':
          this.style.addObj({
            justifyContent: 'space-between'
          });
          break;
        case 'space-around':
          this.style.addObj({
            justifyContent: 'space-around'
          });
          break;
        case 'space-evenly':
          this.style.addObj({
            justifyContent: 'space-evenly'
          });
          break;
        default:
          break;
      }
    }
    if (props?.align) {
      // this.setAlign(props.align);
      switch (props.align) {
        case 'top':
          this.style.addObj({
            alignItems: 'flex-start'
          });
          break;
        case 'middle':
          this.style.addObj({
            alignItems: 'center'
          });
          break;
        case 'bottom':
          this.style.addObj({
            alignItems: 'flex-end'
          });
          break;
        case 'stretch':
          this.style.addObj({
            alignItems: 'stretch'
          });
          break;
      }
    }
  }
}
