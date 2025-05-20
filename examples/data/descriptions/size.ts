import { Div, TypeDiv, createStyle } from '@type-dom/framework';
import {
  ComponentSize,
  TdButton,
  TdDescriptions,
  TdDescriptionsItem,
  TdIcon,
  TdRadioGroup,
  TdRadio,
  TdTag
} from '@type-dom/ui';
import { ElIphoneSvg, ElLocationSvg, ElOfficeBuildingSvg, ElTicketsSvg, ElUserSvg } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';

export class DescriptionsSizeExample extends TypeDiv {
  className = 'DescriptionsSizeExample';

  override setup() {
    const size = signal<ComponentSize>('default');

    const iconStyle = computed(() => {
      const marginMap = {
        '':  '6px',
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
        '': '28px',
        large: '32px',
        default: '28px',
        small: '24px'
      };
      return {
        marginTop: marginMap[size.get()] || marginMap.default
      };
    });
    createStyle(`
      .el-descriptions {
        margin-top: 20px;
      }
      .cell-item {
        display: flex;
        align-items: center;
      }
      .margin-top {
        margin-top: 20px;
      }
    `)
    this.addChildren(
      new TdRadioGroup({
        vModel: size,
        slot: [
          new TdRadio({
            value: 'large',
            slot: 'Large',
          }),
          new TdRadio({
            value: 'default',
            slot: 'Default',
          }),
          new TdRadio({
            value: 'small',
            slot: 'Small',
          })
        ],
      }),
      new TdDescriptions({
        class: 'margin-top',
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
                class: 'cell-item',
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElUserSvg()
                  }),
                  'Username'
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slot: '18100000000',
            slots: {
              label: new Div({
                class: 'cell-item',
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElIphoneSvg()
                  }),
                  'Telephone'
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slot: 'Suzhou',
            slots: {
              label: new Div({
                class: 'cell-item',
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElLocationSvg()
                  }),
                  'Place'
                ]
              })
            }
          }),
          new TdDescriptionsItem({
            slots: {
              label: new Div({
                class: 'cell-item',
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElTicketsSvg()
                  }),
                  'Remarks'
                ]
              })
            },
            slot: new TdTag({
              slot: 'School',
              size: 'small'
            })
          }),
          new TdDescriptionsItem({
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province',
            slots: {
              label: new Div({
                class: 'cell-item',
                slot: [
                  new TdIcon({
                    styleObj: iconStyle,
                    slot: new ElOfficeBuildingSvg()
                  }),
                  'Address'
                ]
              })
            }
          })
        ]
      }),

      new TdDescriptions({
        class: 'margin-top',
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
