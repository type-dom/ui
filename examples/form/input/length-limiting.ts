import { Div, TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class InputLengthLimitingExample extends TypeDiv {
  className = 'InputLengthLimitingExample';

  constructor() {
    super();
    const text = signal('')
    const textarea = signal('')
    this.addChildren(
      new TdInput({
        vModel: text,
        styleObj: {
          width: 240,
        },
        maxlength: 10,
        placeholder: 'Please input',
        showWordLimit: true,
        type: 'text'
      }),
      new Div({
        styleObj: {
          margin: '20px 0'
        }
      }),
      new TdInput({
        vModel: textarea,
        maxlength: 30,
        styleObj: {
          width: 240,
        },
        placeholder: 'Please input',
        showWordLimit: true,
        type: 'textarea',
      })
    );
  }
}
