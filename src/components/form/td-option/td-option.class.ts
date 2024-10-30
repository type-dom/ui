import { UI } from '../../../ui/ui.abstract';
import { $select, $selectOption } from '../td-select/td-select.style';
import { ITdOption, ITdOptionConfig } from './td-option.interface';

export class TdOption extends UI implements ITdOption {
  className: 'TdOption';
  override props: ITdOptionConfig;

  constructor(params: ITdOptionConfig = {}) {
    super();
    this.useTag('li');
    this.className = 'TdOption';
    this.attr.addObj({
      name: 'td-option',
      role: 'option'
    });
    this.style.addObj({
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
      cursor: 'pointer'
    });
    this.props = this.useParams(params);
  }
}
