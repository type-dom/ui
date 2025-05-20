import { TypeDiv } from '@type-dom/framework';
import { TdDescriptions, TdDescriptionsItem, TdTag, TdImage } from '@type-dom/ui';

export class DescriptionsRowspanExample extends TypeDiv {
  className = 'DescriptionsRowspanExample';

  override setup() {
    this.addChildren(
      new TdDescriptions({
        title: 'Width horizontal list',
        column: 3,
        border: true,
        slot: [
          new TdDescriptionsItem({
            rowspan: 2,
            width: '140px',
            label: 'Photo',
            align: 'center',
            slot: new TdImage({
              styleObj: {
                width: '100px',
                height: '100px'
              },
              src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            })
          }),
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
        title: 'Width vertical list',
        direction: 'vertical',
        column: 3,
        border: true,
        styleObj: {
          marginTop: '20px'
        },
        slot: [
          new TdDescriptionsItem({
            rowspan: 2,
            width: 140,
            label: 'Photo',
            align: 'center',
            slot: new TdImage({
              styleObj: {
                width: '100px',
                height: '100px'
              },
              src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            })
          }),
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
