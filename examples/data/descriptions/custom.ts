import { TypeDiv } from '@type-dom/framework';
import { $colors, TdDescriptions, TdDescriptionsItem, TdTag } from '@type-dom/ui';

export class DescriptionsCustomExample extends TypeDiv {
  className = 'DescriptionsCustomExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdDescriptions({
        title: 'Customized style list',
        styleObj: $item,
        column: 3,
        border: true,
        slot: [
          new TdDescriptionsItem({
            label: 'Username',
            labelAlign: 'right',
            align: 'center',
            // labelClassName: 'my-label',
            labelStyle: {
              backgroundColor: $colors.success['light-9']
            },
            width: '150px',
            slot: 'kooriookami',
            // className: 'my-content',
            contentStyle: {
              backgroundColor: $colors.danger['light-9']
            }
          }),
          new TdDescriptionsItem({
            label: 'Telephone',
            labelAlign: 'right',
            align: 'center',
            slot: '18100000000'
          }),
          new TdDescriptionsItem({
            label: 'Place',
            labelAlign: 'right',
            align: 'center',
            slot: 'Suzhou'
          }),
          new TdDescriptionsItem({
            label: 'Remarks',
            labelAlign: 'right',
            align: 'center',
            slot: new TdTag({
              slot: 'School',
              size: 'small',
            })
          }),
          new TdDescriptionsItem({
            label: 'Address',
            labelAlign: 'right',
            align: 'center',
            slot: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'
          })
        ]
      }),
    );
  }
}
