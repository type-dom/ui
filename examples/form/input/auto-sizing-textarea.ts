import { Div, TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class InputAutoSizingTextareaExample extends TypeDiv {
  className = 'InputAutoSizingTextareaExample';

  constructor() {
    super();
    const textarea1 = signal('')
    const textarea2 = signal('')
    this.addChildren(
      new TdInput({
        vModel: textarea1,
        styleObj: {
          width: 240,
        },
        autosize: true,
        type: 'textarea',
        placeholder: 'Please input',
      }),
      new Div({
        styleObj: {
          marginTop: '20px 0',
        },
      }),
      new TdInput({
        vModel: textarea2,
        styleObj: {
          width: 240,
        },
        autosize: {
          minRows: 2,
          maxRows: 4,
        },
        type: 'textarea',
        placeholder: 'Please input',
      })
    );
  }
}
