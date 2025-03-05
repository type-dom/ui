import { TypeDiv } from '@type-dom/framework';
import {
  TdButton, TdCheckbox, TdCheckboxGroup,
  TdForm,
  TdFormItem,
  TdInput, TdOption, TdRadio,
  TdRadioGroup, TdSelect,
  TdSwitch
} from '@type-dom/ui';
import { toRefs, toSignals } from '@type-dom/signals';

export class FormBasicExample extends TypeDiv {
  className = 'FormBasicExample';

  constructor() {
    super();

// do not use same name with ref
    const form = toSignals({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    const onSubmit = () => {
      console.log('submit!')
    }

    this.addChild(
      new TdForm({
        model: form,
        labelWidth: 'auto',
        styleObj: {
          maxWidth: '600px'
        },
        slot: [
          new TdFormItem({
            label: 'Activity name',
            required: true,
            slot: new TdInput({
              vModel: form.name,
              placeholder: 'Please enter activity name'
            })
          }),
          new TdFormItem({
            label: 'Activity zone',
            slot: [
              new TdSelect({
                vModel: form.region,
                placeholder: 'please select your zone',
                slot: [
                  new TdOption({
                    label: 'Zone one',
                    value: 'shanghai',
                  }),
                  new TdOption({
                    label: 'Zone two',
                    value: 'beijing',
                  })
                ]
              })
            ]
          }),
          new TdFormItem({
            label: 'Activity time'
          }),
          new TdFormItem({
            label: 'Instant delivery',
            slot: new TdSwitch({
              vModel: form.delivery,
            })
          }),
          new TdFormItem({
            label: 'Activity type',
            slot: [
              new TdCheckboxGroup({
                vModel: form.type,
                slot: [
                  new TdCheckbox({
                    name: 'type',
                    label: 'Online activities',
                    value: 'Online activities'
                  }),
                  new TdCheckbox({
                    name: 'type',
                    label: 'Promotion activities',
                    value: 'Promotion activities'
                  }),
                  new TdCheckbox({
                    name: 'type',
                    label: 'Offline activities',
                    value: 'Offline activities'
                  }),
                  new TdCheckbox({
                    name: 'type',
                    label: 'Simple brand exposure',
                    value: 'Simple brand exposure'
                  })
                ]
              })
            ]
          }),
          new TdFormItem({
            label: 'Resources',
            slot: new TdRadioGroup({
              vModel: form.resource,
              slot: [
                new TdRadio({
                  label: 'Sponsor',
                  value: 'Sponsor'
                }),
                new TdRadio({
                  label: 'Venue',
                  value: 'Venue'
                })
              ]
            })
          }),
          new TdFormItem({
            label: 'Activity form',
            slot: new TdInput({
              type: 'textarea',
              vModel: form.desc
            })
          }),
          new TdFormItem({
            slot: [
              new TdButton({
                slot: 'Create',
                type: 'primary',
                events: {
                  click: onSubmit
                }
              }),
              new TdButton({
                slot: 'Cancel',
                // type: 'default'
                styleObj: {
                  marginLeft: '10px'
                }
              })
            ]
          })
        ]
      })
    );
  }
}
