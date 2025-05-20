import { TypeDiv } from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { ComponentSize, TdDescriptions, TdDescriptionsItem, TdRadioGroup, TdRadio, TdTag } from '@type-dom/ui';

export class DescriptionsVerticalExample extends TypeDiv {
  className = 'DescriptionsVerticalExample';

  override setup() {

    const size = signal<ComponentSize>('default')

    const blockMargin = computed(() => {
      const marginMap = {
        '': '28px',
        large: '32px',
        default: '28px',
        small: '24px',
      }
      return {
        marginTop: marginMap[size.get()] || marginMap.default,
      }
    })
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
        title: 'Vertical list with border',
        direction: 'vertical',
        column: 4,
        size: size,
        border: true,
        slot: [
          new TdDescriptionsItem({
            label: 'Username',
            slot: 'kooriookami',
          }),
          new TdDescriptionsItem({
            label: 'Telephone',
            slot: '18100000000'
          }),
          new TdDescriptionsItem({
            label: 'Place',
            span: 2,
            slot: 'Suzhou'
          }),
          new TdDescriptionsItem({
            label: 'Remarks',
            slot: new TdTag({
              slot: 'School',
              size: 'small',
            })
          }),
          new TdDescriptionsItem({
            label: 'Address',
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
          })
        ]
      }),

      new TdDescriptions({
        title: 'Vertical list without border',
        column: 4,
        size: size,
        direction: 'vertical',
        styleObj: blockMargin,
        slot: [
          new TdDescriptionsItem({
            label: 'Username',
            slot: 'kooriookami',
          }),
          new TdDescriptionsItem({
            label: 'Telephone',
            slot: '18100000000'
          }),
          new TdDescriptionsItem({
            label: 'Place',
            span: 2,
            slot: 'Suzhou'
          }),
          new TdDescriptionsItem({
            label: 'Remarks',
            slot: new TdTag({
              slot: 'School',
              size: 'small',
            })
          }),
          new TdDescriptionsItem({
            label: 'Address',
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
          })
        ]
      }),
    );
  }
}
