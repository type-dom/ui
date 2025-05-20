import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdInput, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { ElSearchSvg } from '@type-dom/svgs';

export class InputMixedExample extends TypeDiv {
  className = 'InputMixedExample';

  constructor() {
    super();
    const input1 = signal('')
    const input2 = signal('')
    const input3 = signal('')
    const select = signal('')
    createClass('input-with-select td-input-group__prepend', {
      backgroundColor: 'var(--el-fill-color-blank)'
    })
    this.addChildren(
      new Div({
        slot: new TdInput({
          vModel: input1,
          styleObj: {
            maxWidth: '600px'
          },
          placeholder: 'Please input',
          slots: {
            prepend: 'Http://'
          }
        })
      }),
      new Div({
        class: 'mt-4',
        slot: new TdInput({
          vModel: input2,
          styleObj: {
            maxWidth: '600px'
          },
          placeholder: 'Please input',
          slots: {
            append: '.com'
          }
        })
      }),
      new Div({
        class: 'mt-4',
        slot: new TdInput({
          vModel: input3,
          styleObj: {
            maxWidth: '600px'
          },
          placeholder: 'Please input',
          class: 'input-with-select',
          slots: {
            prepend: new TdSelect({
              vModel: select,
              placeholder: 'Select',
              styleObj: {
                width: '115px'
              },
              slot: [
                new TdOption({
                  label: 'Restaurant',
                  value: '1'
                }),
                new TdOption({
                  label: 'Order No.',
                  value: '2'
                }),
                new TdOption({
                  label: 'Tel',
                  value: '3'
                })
              ]
            }),
            append: new TdButton({
              icon: new ElSearchSvg(),
            })
          }
        })
      }),
      new Div({
        class: 'mt-4',
        slot: new TdInput({
          vModel: input3,
          styleObj: {
            maxWidth: '600px'
          },
          placeholder: 'Please input',
          class: 'input-with-select',
          slots: {
            prepend: new TdButton({
              icon: new ElSearchSvg(),
            }),
            append: new TdSelect({
              vModel: select,
              placeholder: 'Select',
              styleObj: {
                width: '115px'
              },
              slot: [
                new TdOption({
                  label: 'Restaurant',
                  value: '1'
                }),
                new TdOption({
                  label: 'Order No.',
                  value: '2'
                }),
                new TdOption({
                 label: 'Tel',
                  value: '3'
                })
              ]
            })
          }
        })
      }),
    );
  }
}
