import { LI, UL } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $selectGroup } from '../td-select/td-select.style';
import { ITdOptionGroup, ITdOptionGroupConfig } from './td-option-group.interface';

export class TdOptionGroup extends UI implements ITdOptionGroup {
  className: 'TdOptionGroup';
  override props: ITdOptionGroupConfig;

  constructor(params: ITdOptionGroupConfig = {}) {
    super();
    this.useTag('ul');
    this.className = 'TdOptionGroup';
    this.attr.addObj({
      name: 'option-group-wrap'
    });
    this.style.addObj({
      margin: '0',
      padding: '0',
      position: 'relative',
      listStyle: 'none'
    });
    const $gap = '20px';
    this.addChildren(
      new LI({
        text: params?.label || '选项组',
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
          lineHeight: $selectGroup.height
        }
      }),
      new LI({
        childNodes: [
          new UL({
            styleObj: {
              margin: '0',
              padding: '0',
              position: 'relative',
              listStyle: 'none'
            }
          })
        ]
      })
    );
    this.props = this.useParams(params);
  }
}
