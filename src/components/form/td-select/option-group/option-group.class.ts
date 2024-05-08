import { LI, UL } from '@type-dom/framework';
import { UI } from '../../../../ui/ui.abstract';
import { ITdOptionGroup, ITdOptionGroupConfig } from './option-group.interface';
import { $selectGroup } from '../td-select.style';

export class TdOptionGroup extends UI implements ITdOptionGroup {
  className: 'TdOptionGroup';
  constructor(config?: ITdOptionGroupConfig) {
    super({ tag: 'ul' });
    this.className = 'TdOptionGroup';
    this.addAttrObj({
      name: 'option-group-wrap'
    });
    this.addStyleObj({
      margin: '0',
      padding: '0',
      position: 'relative',
      listStyle: 'none',
    })
    const $gap = '20px';
    this.addChildren(
      new LI({
        text: config?.label || '选项组',
        attrObj: {
          name: 'option-group-title'
        },
        styleObj: {
          paddingLeft: $gap,
          // fontSize: map.get($select-group, 'font-size'),
          fontSize: $selectGroup.fontSize,
          // color: map.get($select-group, 'text-color'),
          color: $selectGroup.textColor,
          // line-height: map.get($select-group, 'height'),
          lineHeight: $selectGroup.height,
        }
      }),
      new LI({
        childNodes: [
          new UL({
            styleObj: {
              margin: '0',
              padding: '0',
              position: 'relative',
              listStyle: 'none',
            }
          })
        ]
      })
    )
    this.setConfig(config);
  }
}
