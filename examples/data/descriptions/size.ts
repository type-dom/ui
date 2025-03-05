import { IStyle } from '@type-dom/css-type';
import { Div, TextNode, TypeDiv } from '@type-dom/framework';
import {
  ComponentSize as ISize,
  TdButton,
  TdDescriptions,
  TdDescriptionsItem,
  TdIcon,
  TdRadioGroup,
  TdTag
} from '@type-dom/ui';
import { ElIphoneSvg, ElLocationSvg, ElOfficeBuildingSvg, ElTicketsSvg, ElUserSvg } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';

export class DescriptionsSizeExample extends TypeDiv {
  className = 'DescriptionsSizeExample';

  constructor() {
    super();
    const $cellItem: IStyle = {
      display: 'flex',
      alignItems: 'center'
    };
    const size = signal<ISize>('default');

    const iconStyle = computed(() => {
      const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px'
      };
      return {
        marginRight: marginMap[size.get()] || marginMap.default
      };
    });
    const blockMargin = computed(() => {
      const marginMap = {
        large: '32px',
        default: '28px',
        small: '24px'
      };
      return {
        marginTop: marginMap[size.get()] || marginMap.default
      };
    });
    this.addChildren(
      new TdRadioGroup({
        modelValue: size,
        options: [
          { label: 'Large', value: 'large' },
          { label: 'Default', value: 'default' },
          { label: 'Small', value: 'small' }
        ],
        events: {
          click: (evt, element: TdRadioGroup) => {
            // 1. 获取到当前选中的值
            const value = element.props.modelValue as ISize;
            size.set(element.props.modelValue as ISize);
            // 2. 设置大小
            this.childNodes.forEach((child) => {
              if (child instanceof TdDescriptions) {
                child.setSize(value);
              }
            });
          }
        },
        emits: {
          change: (value) => {
            console.log('radio group clicked . ', value);
          }
        }
      }),
      new TdDescriptions({
        title: 'With border',
        column: 3,
        size: size,
        border: true,
        slots: {
          extra: new TdButton({
            type: 'primary',
            slot: 'Operation'
          })
        },
        slot: [
          new TdDescriptionsItem({
            slot: 'kooriookami',
            slots: {
              label: new Div({
                name: 'cell-item',
                styleObj: $cellItem,
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElUserSvg()
                  }),
                  new TextNode('Username')
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slot: '18100000000',
            slots: {
              label: new Div({
                name: 'cell-item',
                styleObj: $cellItem,
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElIphoneSvg()
                  }),
                  new TextNode('Telephone')
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slot: 'Suzhou',
            slots: {
              label: new Div({
                name: 'cell-item',
                styleObj: $cellItem,
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElLocationSvg()
                  }),
                  new TextNode('Place')
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slots: {
              label: new Div({
                name: 'cell-item',
                styleObj: $cellItem,
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElTicketsSvg()
                  }),
                  new TextNode('Remarks')
                ]
              })
            },
            slot: new TdTag({
              slot: 'School',
              size: 'small'
            })
          }),
          new TdDescriptionsItem({
            label: '',
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province',
            slots: {
              label: new Div({
                name: 'cell-item',
                styleObj: $cellItem,
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElOfficeBuildingSvg()
                  }),
                  new TextNode('Address')
                ]
              })
            }
          })
        ]
      }),

      new TdDescriptions({
        title: 'Without border',
        column: 3,
        size: size,
        styleObj: blockMargin,
        slots: {
          extra: new TdButton({
            type: 'primary',
            slot: 'Operation'
          })
        },
        slot: [
          new TdDescriptionsItem({
            label: 'Username',
            slot: 'kooriookami'
          }),
          new TdDescriptionsItem({
            label: 'Telephone',
            slot: '18100000000'
          }),
          new TdDescriptionsItem({
            label: 'Place',
            slot: 'Suzhou'
          }),
          new TdDescriptionsItem({
            label: 'Remarks',
            slot: new TdTag({
              slot: 'School',
              size: 'small'
            })
          }),
          new TdDescriptionsItem({
            label: 'Address',
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
          })
        ]
      })
    );
  }
}
