import { UI } from '../../../../ui/ui.abstract';
import { ITdOption, ITdOptionConfig } from './option.interface';
import { $select, $selectOption } from '../td-select.style';
import { StyleCursor } from '@type-dom/framework';

export class TdOption extends UI implements ITdOption {
  className: 'TdOption';
  constructor(config?: ITdOptionConfig) {
    super({ tag: 'li' });
    this.className = 'TdOption';
    this.addAttrObj({
      name: 'td-option',
      role: 'option',
    });
    this.addStyleObj({
      // font-size: map.get($select, 'font-size'),
      fontSize: $select.fontSize, // $fontSizes.base,
      // 20 as the padding of option item, 12 as the size of ✓ icon size
      padding: '0 #{20 + 12}px 0 20px',
      position: 'relative',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // color: map.get($select-option, 'text-color'),
      color: $selectOption.textColor,
      // height: map.get($select-option, 'height'),
      height: $selectOption.height,
      // line-height: map.get($select-option, 'height'),
      lineHeight: $selectOption.height,
      boxSizing: 'border-box',
      cursor: StyleCursor.pointer,
    });
    this.setConfig(config);
  }
}
