import { $textColor } from '../../../../styles/var';
import { UI } from '../../../../ui/ui.abstract';
import { ITdPopperArrow, ITdPopperArrowConfig } from './arrow.interface';

export class TdPopperArrow extends UI implements ITdPopperArrow {
  className: 'TdPopperArrow';
  constructor(config?: ITdPopperArrowConfig) {
    super({ tag: 'span' });
    this.className = 'TdPopperArrow';
    this.addAttrName('td-popper-arrow');
    this.addStyleObj({
      position: 'absolute',
      width: '10px',
      height: '10px',
      zIndex: -1,
    //   todo next is ::before style
    //   &::before {
    //   position: absolute;
    //   width: 10px;
    //   height: 10px;
    //   z-index: -1;
      content: ' ',
      transform: 'rotate(45deg)',
      // background: getCssVar('text-color', 'primary'),
      backgroundColor: $textColor.primary,
      boxSizing: 'border-box',
    // }
    });
    this.setConfig(config);
  }
}
