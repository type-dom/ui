import { LI, TypeUL, UL } from '@type-dom/framework';
import { $selectGroup } from '../td-select/td-select.style';
import { ITdOptionGroup, OptionGroupProps } from './td-option-group.interface';

export class TdOptionGroup extends TypeUL implements ITdOptionGroup {
  className: 'TdOptionGroup';
  override props: OptionGroupProps;

  constructor(params = {} as OptionGroupProps) {
    super();
    this.className = 'TdOptionGroup';
    this.attr.addObj({
      name: 'option-group-wrap',
    });
    this.style.addObj({
      margin: '0',
      padding: '0',
      position: 'relative',
      listStyle: 'none',
    });
    const $gap = '20px';
    this.addChildren(
      new LI({
        slot: params?.label || '选项组',
        attrObj: {
          name: 'option-group-title',
        },
        styleObj: {
          paddingLeft: $gap,
          // fontSize: map.get($select-group, 'font-size'),
          fontSize: $selectGroup.fontSize,
          // color: map.get($select-group, 'text-color'),
          color: $selectGroup.textColor,
          // line-height: map.get($select-group, 'height'),
          lineHeight: $selectGroup.height,
        },
      }),
      new LI({
        slot: [
          new UL({
            styleObj: {
              margin: '0',
              padding: '0',
              position: 'relative',
              listStyle: 'none',
            },
          }),
        ],
      })
    );
    this.props = this.useParams(params);
  }
}
