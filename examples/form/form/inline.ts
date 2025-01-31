import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdForm, TdFormItem, TdInput } from '@type-dom/ui';

export class FormInlineExample extends TypeDiv {
  className = 'FormInlineExample';

  constructor() {
    super();
    const model = {
      formItem1: '',
      formItem2: '',
      formItem3: ''
    };
    this.addChild(
      new TdForm({
        inline: true,
        model: model,
        slot: [
          new TdFormItem({
            label: 'Activity name',
            slot: new TdInput({
              modelValue: model.formItem1,
              placeholder: 'Please enter activity name'
            })
          }),
          new TdFormItem({
            label: 'Activity zone',
            slot: new TdInput({
              modelValue: model.formItem2,
              placeholder: 'Please enter activity zone'
            })
          }),
          new TdFormItem({
            label: 'Activity time',
            slot: new TdInput({
              modelValue: model.formItem3,
              placeholder: 'Please enter activity time'
            })
          }),
          new TdFormItem({
            slot: new TdButton({
              slot: 'Query',
              type: 'primary',
              events: {
                click: () => {
                  console.log('submit');
                }
              }
            })
          })
        ]
      })
    );
  }
}
