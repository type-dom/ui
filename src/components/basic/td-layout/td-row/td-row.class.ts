import { ITdRow, ITdRowConfig } from './td-row.interface';
import { UI } from '../../../../ui/ui.abstract';
import { TdCol } from '../td-col/td-col.class';

export class TdRow extends UI implements ITdRow {
  className: 'TdRow';
  override childNodes: TdCol[];
  gutter?: number;
  // justify: string = 'start';
  // align: string = 'top';
  // tag: string = 'div';
  constructor(config?: ITdRowConfig) {
    super();
    this.className = 'TdRow';
    this.addStyleObj({
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      boxSizing: 'border-box'
    });
    this.childNodes = [];
    this.setConfig(config);
  }

  override setConfig(config?: ITdRowConfig) {
    super.setConfig(config);
    if (config?.gutter) {
      this.gutter = config.gutter;
      this.addStyleObj({
        marginLeft: `-${config.gutter / 2}px`,
        marginRight: `-${config.gutter / 2}px`
      });
      this.children.forEach((child) => {
        if (child instanceof TdCol) {
          if (config.gutter) {
            child.addStyleObj({
              boxSizing: 'border-box',
              paddingLeft: `${config.gutter / 2}px`,
              paddingRight: `${config.gutter / 2}px`
            });
          }
        }
      });
    }
    if (config?.justify) {
      // this.setJustify(config.justify);
      switch (config.justify) {
        case 'center':
          this.addStyleObj({
            justifyContent: 'center'
          });
          break;
        case 'end':
          this.addStyleObj({
            justifyContent: 'flex-end'
          });
          break;
        case 'space-between':
          this.addStyleObj({
            justifyContent: 'space-between'
          });
          break;
        case 'space-around':
          this.addStyleObj({
            justifyContent: 'space-around'
          });
          break;
        case 'space-evenly':
          this.addStyleObj({
            justifyContent: 'space-evenly'
          });
          break;
        default:
          break;
      }
    }
    if (config?.align) {
      // this.setAlign(config.align);
      switch (config.align) {
        case 'top':
          this.addStyleObj({
            alignItems: 'flex-start'
          });
          break;
        case 'middle':
          this.addStyleObj({
            alignItems: 'center'
          });
          break;
        case 'bottom':
          this.addStyleObj({
            alignItems: 'flex-end'
          });
          break;
        case 'stretch':
          this.addStyleObj({
            alignItems: 'stretch'
          });
          break;
      }
    }
  }
}
