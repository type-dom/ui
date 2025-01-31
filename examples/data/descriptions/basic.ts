import { TypeDiv } from '@type-dom/framework';
import { TdDescriptions, TdDescriptionsItem, TdTag } from '@type-dom/ui';

export class DescriptionsBasicExample extends TypeDiv {
  className = 'DescriptionsBasicExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.slotChildren(
      new TdDescriptions({
        title: 'User Info',
        styleObj: $item,
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
    console.warn('DescriptionsBasicExample this is ', this);
  }
}
