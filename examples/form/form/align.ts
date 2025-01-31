import { TypeDiv } from '@type-dom/framework';
import {
  ILabelPosition,
  TdForm,
  TdFormItem,
  TdInput,
  TdRadioGroup
} from '@type-dom/ui';

export class FormAlignExample extends TypeDiv {
  className = 'FormAlignExample';

  constructor() {
    super();
    this.addChildren(
      new TdRadioGroup({
        name: 'radio-group',
        modelValue: 'right',
        isButton: true,
        styleObj: {
          marginBottom: '40px'
        },
        options: [
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          },
          {
            label: 'Top',
            value: 'top'
          }
        ],
        events: {
          click: (evt, element: TdRadioGroup) => {
            console.log('radio-group event ', evt);
            console.log('element.modelValue is ', element?.props.modelValue);
            const form = this.down<TdForm>('refId', 'form-ref');
            console.log('form is ', form);
            if (form && form instanceof TdForm) {
              form.childNodes.forEach((child) => {
                if (element?.props.modelValue === 'top') {
                  // child.setLabelPosition('left');
                  child.style.setObj({
                    display: 'block'
                  });
                } else {
                  // child.setLabelPosition(
                  //   element?.props.modelValue as ILabelPosition
                  // );
                  child.style.setObj({
                    display: 'flex'
                  });
                }
              });
            }
          }
        }
      }),
      new TdForm({
        labelPosition: 'right', // 要与上面的选中值一致
        refId: 'form-ref',
        labelWidth: '200px',
        styleObj: {
          maxWidth: '600px'
        },
        slot: [
          new TdFormItem({
            label: 'Activity name',
            slot: new TdInput()
          }),
          new TdFormItem({
            label: 'Activity zone',
            slot: new TdInput()
          }),
          new TdFormItem({
            label: 'Activity time',
            slot: new TdInput()
          })
        ]
      })
    );
  }
}
