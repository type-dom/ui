import { TypeDiv, createStyle } from '@type-dom/framework';
import { TdDescriptions, TdDescriptionsItem, TdTag } from '@type-dom/ui';

export class DescriptionsCustomExample extends TypeDiv {
  className = 'DescriptionsCustomExample';

  override setup() {
    createStyle(`
      .my-label {
        background: var(--td-color-success-light-9) !important;
      }
      .my-content {
        background: var(--td-color-danger-light-9);
      }
    `);
    this.addChildren(
      new TdDescriptions({
        title: 'Customized style list',
        column: 3,
        border: true,
        slot: [
          new TdDescriptionsItem({
            label: 'Username',
            labelAlign: 'right',
            align: 'center',
            labelClassName: 'my-label',
            className: 'my-content',
            width: '150px',
            slot: 'kooriookami',
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
